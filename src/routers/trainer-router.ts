import express from 'express';

export const trainerRouter = express.Router();

interface Trainer {
    id:         number;
    firstName:  string;
    lastName:   string;
    batchId:    number;
}

const trainers: Trainer[] = [{
    id: 1,
    firstName: 'Terry',
    lastName: 'Reignor',
    batchId: 1
}];

trainerRouter.get('', (request, response, next) => {
    response.json(trainers);
    next();
});

trainerRouter.post('', (request, response, next) => {
    const body = request.body;

    if (body && body.firstName) {
        // add trainers to our list
        trainers.push(body);
    }

    console.log('Request received - processing at app.trainerRouter.post');
    // set a status before calling send/json
    response.status(201);
    response.json(body);
    next();
});