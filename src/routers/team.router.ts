import express from 'express';
import * as teamService from '../services/team.service';
import { Team } from '../models/Team';

export const teamRouter = express.Router();

teamRouter.get('', async (request, response, next) => {

    let teams: Team[];

    try {
        teams = await teamService.getAllTeams();
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!teams) {
        response.sendStatus(404);
    } else {
        response.json(teams);
    }
    next();
});

teamRouter.get('/:id', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let team: Team;

    try {
        team = await teamService.getTeamById(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!team) {
        response.sendStatus(404);
    } else {
        response.json(team);
    }
    next();
});

teamRouter.post('', async (request, response, next) => {
    const team = request.body;

    try {
        await teamService.saveTeam(team);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

teamRouter.patch('', async (request, response, next) => {
    const team = request.body;
    let updatedTeam: Team;

    try {
    updatedTeam = await teamService.patchTeam(team);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (updatedTeam) {
        response.sendStatus(201);
        response.json(updatedTeam);
    } else {
        response.status(404);
    }
    next();
});

teamRouter.delete('/:id', async (request, response, next) => {
    const id = parseInt(request.params.id);
    let deletedTeam: Team;

    try {
        deletedTeam = await teamService.deleteTeam(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!deletedTeam) {
        response.sendStatus(404);
    } else {
        response.json(deletedTeam);
    }
    next();
});
