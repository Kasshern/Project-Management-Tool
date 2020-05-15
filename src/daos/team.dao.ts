import { db } from '../daos/db';
import { Team } from '../models/Team';

/**
 * Doc Notes
 *
 */
export async function getAllTeams(): Promise<Team[]> {
    const sql = 'SELECT * FROM teams';

    const result = await db.query<Team>(sql, []);
    return result.rows;
}

export async function getTeamById(id: number): Promise<Team> {
    const sql = 'SELECT * FROM teams WHERE id = $1';

    const result = await db.query<Team>(sql, [id]);
    return result.rows[0];
}

export async function saveTeam(team: Team): Promise<Team> {
    const sql = `INSERT INTO teams (project_id, team_name, tech_focus, max_people) \
VALUES ($1, $2, $3, $4) RETURNING *`;

    const result = await db.query<Team>(sql, [
        team.projectId,
        team.teamName,
        team.techFocus,
        team.maxPeople,
    ]);
    return result.rows[0];
}

export async function patchTeam(team: Team): Promise<Team> {
    const sql = `UPDATE people SET team_name = COALESCE($1, team_name), \
tech_focus = COALESCE($2, tech_focus), max_people = COALESCE($3, max_people), \
 WHERE id = $5 RETURNING *`;

    const result = await db.query(sql, [
        team.teamName,
        team.techFocus,
        team.maxPeople,
        team.id,
        team.projectId
        ]);

    return result.rows[0];
}

export async function deleteTeam(id: number): Promise<Team> {
    const sql = `DELETE FROM teams WHERE id = $1 RETURNING *`;

    const result = await db.query<Team>(sql, [id]);
    return result.rows[0];
}