import express from 'express';
import * as projectService from '../services/project.service'
import { Project } from '../models/Project';
import { Team } from '../models/Team';


export const projectRouter = express.Router();

// Retrieves an Array of all projects
projectRouter.get('', async (request, response, next) => {
    let projects: Project[];

    try {
        projects = await projectService.getAllProjects();
        response.json(projects);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Retrieves a single project object by ID
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

// Creates a new project
projectRouter.post('', async (request, response, next) => {
    const project = request.body;
    let newProject: Project;
    try {
        newProject = await projectService.saveProject(project);
        response.status(201);
        response.json(newProject);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Updates an existing project
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
        response.status(200);
        response.json(updatedProject);
    }
    next();
});

// Deletes an existing project
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
        response.status(200);
        response.json(deletedProject);
    }
    next();
});

