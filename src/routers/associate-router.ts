import express from 'express';

export const associateRouter = express.Router();

interface Associate{
    id:         number;
    firstName:  string;
    lastName:   string;
    projectNum: number;
    teamNum:    number;
    skillLevel: string;
}

const associates: Associate[] = [{
    id: 1,
    firstName:  'Adam',
    lastName:   'Sosiat',
    projectNum: 1,
    teamNum:    1,
    skillLevel: 'intermediate'
}]

associateRouter.get('', (request, response, next) => {
    response.json(associates);
    next();
});

associateRouter.post('', (request, response, next) => {
    const body = request.body;

    if (body && body.projectNum) {
        // add associate to our list
        associates.push(body);
    }

    console.log('Request received - processing at app.associateRouter.post');
    // set status before calling send/json
    response.status(201);
    response.json(body);
    next();
});