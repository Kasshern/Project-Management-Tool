import express from 'express';

export const projectRouter = express.Router();

interface Project {
    projectNumber:  number;
    projectName:    string;
    projectGoal:    string;
    maxTeams:       number;

}

const projects: Project[] = [{
    projectNumber: 1,
    projectName: 'project0',
    projectGoal: 'RESTfulAPI',
    maxTeams: 1
}];

projectRouter.get('', (request, response, next) => {
    response.json(projects);
    next();
});

projectRouter.post('', (request, response, next) => {
    const body = request.body;

    if (body && body.projectName) {
        // add team to our list
        projects.push(body);
    }

    console.log('Request received - processing at app.projectRouter.post');
    // set status before calling send/json
    response.status(201);
    response.json(body);
    next();
})