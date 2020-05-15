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
    const sql = `INSERT INTO projects (project_name, goal, max_teams) \
VALUES ($1, $2, $3) RETURNING *`;

    const result = await db.query<Project>(sql, [
        project.projectName,
        project.goal,
        project.maxTeams
    ]);
    return result.rows[0];
}

export async function patchProject(project: Project): Promise<Project> {
    const sql = `UPDATE people SET project_name = COALESCE($1, project_name), \
                goal = COALESCE($2, goal), max_teams = COALESCE($3, max_teams), \
                 WHERE id = $4 RETURNING *`;

   // const birthdate = project.birthdate && project.birthdate.toISOString();

    const result = await db.query(sql, [
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