import express from 'express';
import { StringDecoder } from 'string_decoder';

export const teamRouter = express.Router();

interface Team {
    id:             number;
    teamName:       string;
    techFocus:      string;
    // teamLeader:  string;
    goal:           string;
    memberQuantity: number;
    memberMax:      number;
}

const teams: Team[] = [{
    id: 1,
    teamName: 'team1',
    techFocus: 'server-side',
    goal: 'create middleware and server',
    memberQuantity: 0,
    memberMax: 5
}];

teamRouter.get('', (request, response, next) =>{
    response.json(teams);
    next();
})

teamRouter.post('', (request, response, next) => {
    const body = request.body;

    if (body && body.teamName) {
        // add team to our list
        teams.push(body);
    }

    console.log('Request received - processing at app.teamRouter.post');
    // set status before calling send/json
    response.status(201);
    response.json(body);
    next();
});