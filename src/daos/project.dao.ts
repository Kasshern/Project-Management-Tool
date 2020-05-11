import { db } from '../daos/db';
import { Project, ProjectRow } from '../models/Project';

export function getAllProjects(): Promise<Project[]> {
    const sql = 'SELECT * FROM projects';
    return db.query<ProjectRow>(sql, []).then(result => {
        const rows: ProjectRow[] = result.rows;
        console.log(rows);
        const projects: Project[] = rows.map(row => Project.from(row));
        return projects;
    });
}

export function getProjectById(id: number): Promise<Project> {
    const sql = 'SELECT * FROM projects WHERE id = $1';

    return db.query<ProjectRow>(sql, [id])
        .then(result => result.rows.map(row => Project.from(row))[0]);
}

export function saveProject(project: Project): Promise<Project> {
    const sql = `INSERT INTO projects (project_name, tech_focus, max_people, number_of_people) \
VALUES ($1, $2, $3, $4) RETURNING *`;

    return db.query<ProjectRow>(sql, [
        project.projectName,
        project.goal,
        project.maxTeams,
        project.numberOfTeams
    ]).then(result => result.rows.map(row => Project.from(row))[0]);
}

export function patchProject(project: Project): Promise<Project> {
    const sql = `UPDATE people SET project_name = COALESCE($1, project_name), \
goal = COALESCE($2, goal), max_teams = COALESCE($3, max_teams), \
number_of_teams = COALESCE($4, number_of_teams) WHERE id = $5 RETURNING *`;

   // const birthdate = project.birthdate && project.birthdate.toISOString();

    const params = [project.projectName, project.goal, project.maxTeams,
                    project.numberOfTeams, project.id, project.id];

    return db.query<ProjectRow>(sql, params)
        .then(result => result.rows.map(row => Project.from(row))[0]);
}

export function deleteProject(id: number): Promise<Project> {
    const sql = `DELETE FROM projects WHERE id = $1 RETURNING *`;

    return db.query<ProjectRow>(sql, [id])
       .then(result => result.rows.map(row => Project.from(row))[0]);
}