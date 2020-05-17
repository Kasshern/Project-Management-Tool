import { db } from '../daos/db';
import { Project } from '../models/Project';

/**
 * Doc Notes
 *
 */
export async function getAllProjects(): Promise<Project[]> {
    const sql = 'SELECT * FROM projects';

    const result = await db.query<Project>(sql, []);
    return result.rows;
}

export async function getProjectById(id: number): Promise<Project> {
    const sql = 'SELECT * FROM projects WHERE id = $1';

    const result = await db.query<Project>(sql, [id]);
    return result.rows[0];
}

export async function saveProject(project: Project): Promise<Project> {
    const sql = `INSERT INTO projects (batch_id, project_name, goal, max_teams) \
VALUES ($1, $2, $3, $4) RETURNING *`;

    const result = await db.query<Project>(sql, [
        project.batchId,
        project.projectName,
        project.goal,
        project.maxTeams
    ]);
    return result.rows[0];
}

export async function patchProject(project: Project): Promise<Project> {
    const sql = `UPDATE projects SET batch_id = COALESCE($1, batch_id) , \
                project_name = COALESCE($2, project_name), \
                goal = COALESCE($3, goal), max_teams = COALESCE($4, max_teams) \
                WHERE id = $5 RETURNING *`;

    const result = await db.query(sql, [
        project.batchId,
        project.projectName,
        project.goal,
        project.maxTeams,
        project.id
    ]);

    return result.rows[0];
}

export async function deleteProject(id: number): Promise<Project> {
    const sql = `DELETE FROM projects WHERE id = $1 RETURNING *`;

    const result = await db.query<Project>(sql, [id])
    return result.rows[0];
}