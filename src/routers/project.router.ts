import express from 'express';
import * as projectService from '../services/project.service'
import { Project } from '../models/Project';


export const projectRouter = express.Router();

projectRouter.get('', async (request, response, next) => {

    let projects: Project[];

    try {
        projects = await projectService.getAllProjects();
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!projects) {
        response.sendStatus(404);
    } else {
        response.json(projects);
    }
    next();
});

projectRouter.get('/:id', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let project: Project;

    try {
        project = await projectService.getProjectById(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!project) {
        response.sendStatus(404);
    } else {
        response.json(project);
    }
    next();
});

projectRouter.post('', async (request, response, next) => {
    const project = request.body;
    let newProject: Project;
    try {
        newProject = await projectService.saveProject(project);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (newProject) {
        response.status(201);
        response.json(newProject);
    }
    next();
});

projectRouter.patch('', async (request, response, next) => {
    const project = request.body;
    let updatedProject: Project;

    try {
    updatedProject = await projectService.patchProject(project);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!updatedProject) {
        response.sendStatus(404);
    } else {
        response.status(201);
        response.json(updatedProject);
    }
    next();
});

projectRouter.delete('/:id', async (request, response, next) => {
    const id = parseInt(request.params.id);
    let deletedProject: Project;

    try {
        deletedProject = await projectService.deleteProject(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!deletedProject) {
        response.sendStatus(404);
    } else {
        response.json(deletedProject);
    }
    next();
});

