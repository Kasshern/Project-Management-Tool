import express from 'express';
import * as teamService from '../services/team.service';

export const teamRouter = express.Router();

teamRouter.get('', (request, response, next) => {
    teamService.getAllTeams().then(teams => {
        response.json(teams);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

teamRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    teamService.getTeamById(id).then(team => {
        if (!team) {
            response.sendStatus(404);
        } else {
            response.json(team);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

teamRouter.post('', (request, response, next) => {
    const team = request.body;
    teamService.saveTeam(team)
        .then(newTeam => {
            response.status(201);
            response.json(newTeam);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});


teamRouter.patch('',(request, response, next) => {
    const team = request.body;
    teamService.patchTeam(team)
    .then(updatedTeam => {
        if(updatedTeam) {
            response.status(201);
            response.json(updatedTeam);
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

teamRouter.delete('/:id', (request, response, next) => {
    const id = +request.params.id;
    teamService.deleteTeam(id).then(team => {
        if(!team) {
            response.status(404);
        } else {
            response.json(team);
        }
        next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});