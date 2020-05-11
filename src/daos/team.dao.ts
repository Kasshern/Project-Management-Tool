import { db } from '../daos/db';
import { Team, TeamRow } from '../models/Team';

export function getAllTeams(): Promise<Team[]> {
    const sql = 'SELECT * FROM teams';
    return db.query<TeamRow>(sql, []).then(result => {
        const rows: TeamRow[] = result.rows;
        console.log(rows);
        const teams: Team[] = rows.map(row => Team.from(row));
        return teams;
    });
}

export function getTeamById(id: number): Promise<Team> {
    const sql = 'SELECT * FROM teams WHERE id = $1';

    return db.query<TeamRow>(sql, [id])
        .then(result => result.rows.map(row => Team.from(row))[0]);
}

export function saveTeam(team: Team): Promise<Team> {
    const sql = `INSERT INTO teams (team_name, tech_focus, max_people, number_of_people) \
VALUES ($1, $2, $3, $4) RETURNING *`;

    return db.query<TeamRow>(sql, [
        team.teamName,
        team.techFocus,
        team.maxPeople,
        team.numberOfPeople
    ]).then(result => result.rows.map(row => Team.from(row))[0]);
}

export function patchTeam(team: Team): Promise<Team> {
    const sql = `UPDATE people SET team_name = COALESCE($1, team_name), \
tech_focus = COALESCE($2, tech_focus), max_people = COALESCE($3, max_people), \
number_of_people = COALESCE($4, number_of_people) WHERE id = $5 RETURNING *`;

   // const birthdate = team.birthdate && team.birthdate.toISOString();

    const params = [team.teamName, team.techFocus, team.maxPeople,
                    team.numberOfPeople, team.id, team.projectId];

    return db.query<TeamRow>(sql, params)
        .then(result => result.rows.map(row => Team.from(row))[0]);
}

export function deleteTeam(id: number): Promise<Team> {
    const sql = `DELETE FROM teams WHERE id = $1 RETURNING *`;

    return db.query<TeamRow>(sql, [id])
       .then(result => result.rows.map(row => Team.from(row))[0]);
}