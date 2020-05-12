import { Project } from '../models/Project';
import * as projectDao from '../daos/project.dao';


export function getAllProjects(): Promise<Project[]> {
    return projectDao.getAllProjects();
}

export function getProjectById(id: number): Promise<Project> {
    return projectDao.getProjectById(id);
}

export function saveProject(project: any): Promise<Project> {
    const newProject = new Project(
        undefined, project.projectName, project.goal,
         project.maxTeams, project.numberOfTeams
    );

        // Validate new project properties
    if (project.projectName && project.goal && project.maxTeams && project.numberOfTeams) {
        return projectDao.saveProject(newProject);
    } else {
        console.warn('Invalid Project');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchProject(input: any): Promise<Project> {
// const birthdate = input.birthdate && new Date(input.birthdate);
const project = new Project(
    input.id, input.projectName, input.goal,
     input.maxTeams, input.numberOfTeams
);

// Cheack that project already exists
if (!project.id) {
    throw new Error ('400');
}

return projectDao.patchProject(project);
}

export function deleteProject(id: number): Promise<Project> {
    return projectDao.deleteProject(id);
}