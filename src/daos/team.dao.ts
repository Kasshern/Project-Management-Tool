import { db } from '../daos/db';
import { Team, TeamRow } from '../models/Team';

/**
 * Doc Notes
 *
 */
export async function getAllTeams(): Promise<Team[]> {
    const sql = 'SELECT * FROM teams';

    const result = await db.query<TeamRow>(sql, []);
    return result.rows.map(Team.from);
}

export async function getTeamById(id: number): Promise<Team> {
    const sql = 'SELECT * FROM teams WHERE id = $1';

    const result = await db.query<TeamRow>(sql, [id]);
    return result.rows.map(Team.from)[0];
}

export async function saveTeam(team: Team): Promise<Team> {
    const sql = `INSERT INTO teams (project_id, team_name, tech_focus, max_people) \
VALUES ($1, $2, $3, $4) RETURNING *`;

    const result = await db.query<TeamRow>(sql, [
        team.projectId,
        team.teamName,
        team.techFocus,
        team.maxPeople,
    ]);
    return result.rows.map(Team.from)[0];
}

export async function patchTeam(team: Team): Promise<Team> {
    const sql = `UPDATE teams SET project_id = COALESCE ($1, project_id),  \
    team_name = COALESCE($2, team_name), tech_focus = COALESCE($3, tech_focus), \
    max_people = COALESCE($4, max_people) WHERE id = $5 RETURNING *`;

    const result = await db.query<TeamRow>(sql, [
        team.projectId,
        team.teamName,
        team.techFocus,
        team.maxPeople,
        team.id
        ]);

        return result.rows.map(Team.from)[0];
}

export async function deleteTeam(id: number): Promise<Team> {
    const sql = `DELETE FROM teams WHERE id = $1 RETURNING *`;

    const result = await db.query<TeamRow>(sql, [id]);
    return result.rows.map(Team.from)[0];
}