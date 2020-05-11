import express from 'express';
import * as projectService from '../services/project.service'
export const projectRouter = express.Router();

projectRouter.get('', (request, response, next) => {
    projectService.getAllProjects().then(projects => {
        response.json(projects);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

projectRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    projectService.getProjectById(id).then(project => {
        if (!project) {
            response.sendStatus(404);
        } else {
            response.json(project);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

projectRouter.post('', (request, response, next) => {
    const project = request.body;
    projectService.saveProject(project)
        .then(newProject => {
            response.status(201);
            response.json(newProject);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

projectRouter.patch('',(request, response, next) => {
    const project = request.body;
    projectService.patchProject(project)
    .then(updatedProject => {
        if(updatedProject) {
            response.status(201);
            response.json(updatedProject);
            next();
        } else {
            response.sendStatus(404);
        }
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    });
});

projectRouter.delete('/:id', (request, response, next) => {
    const id = +request.params.id;
    projectService.deleteProject(id).then(project => {
        if(!project) {
            response.status(404);
        } else {
            response.json(project);
        }
        next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});