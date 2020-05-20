import express from 'express';
import * as teamService from '../services/team.service';
import { Team } from '../models/Team';
import { TeamAssignment } from '../models/TeamAssignment';
import { Associate } from '../models/Associate';

export const teamRouter = express.Router();


// Retrieves an Array of all teams
teamRouter.get('', async (request, response, next) => {
    let teams: Team[];

    try {
        teams = await teamService.getAllTeams();
        response.json(teams);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Retrieves a single team object by ID
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

// Retrieves all associates belonging to a team via team ID
teamRouter.get('/:id/associate', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let associate: Associate[];

    try {
        associate = await teamService.getAssociatesByTeamId(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

        // Dao returns undefined for non-existent team
    if (!associate) {
        response.sendStatus(404);
    } else {
        response.json(associate);
    }
    next();
});

// Retrieves an Array of all team assignments
teamRouter.get('/existing/assignment', async (request, response, next) => {
    let teamAssignments: TeamAssignment[];

    try {
        teamAssignments = await teamService.getAllTeamAssignments();
        response.json(teamAssignments);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Creates a new team
teamRouter.post('', async (request, response, next) => {
    const team = request.body;
    let newTeam: Team;
    try {
        newTeam = await teamService.saveTeam(team);
        response.status(201);
        response.json(newTeam);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Creates a new assignment that assigns an associate to a team
teamRouter.post('/assignment', async (request, response, next) => {
    const teamAssignment = request.body;
    let newTeamAssignment: TeamAssignment;

    try {
        newTeamAssignment = await teamService.saveTeamAssignment(teamAssignment);
        response.status(201);
        response.json(newTeamAssignment);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Updates an existing Team
teamRouter.patch('', async (request, response, next) => {
    const team = request.body;
    let updatedTeam: Team;

    try {
    updatedTeam = await teamService.patchTeam(team);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!updatedTeam) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(updatedTeam);
    }
    next();
});

// Delete an existing team
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
        response.status(200);
        response.json(deletedTeam);
    }
    next();
});

// Delete an existing team assignment
teamRouter.delete('/existing/assignment/:id1/associate/:id2', async (request, response, next) => {
    const id1 = parseInt(request.params.id1);
    const id2 = parseInt(request.params.id2);
    let deletedTeamAssignment: TeamAssignment;

    try {
        deletedTeamAssignment = await teamService.deleteTeamAssignment(id1, id2);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!deletedTeamAssignment) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(deletedTeamAssignment);
    }
    next();
});
