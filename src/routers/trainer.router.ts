import express from 'express';
import * as trainerService from '../services/trainer.service';
import { Trainer } from '../models/Trainer';
import { Batch } from '../models/Batch';
import { Project } from '../models/Project';
import { Team } from '../models/Team';
import { Associate } from '../models/Associate';

export const trainerRouter = express.Router();

// Retrieves an Array of all Associates
trainerRouter.get('', async (request, response, next) => {
    let trainers: Trainer[];

    try {
        trainers = await trainerService.getAllTrainers();
        response.json(trainers);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Retrieves a single trainer object by ID
trainerRouter.get('/:id', async (request, response, next) => {
    const id: number = parseInt(request.params.id);
    let trainer: Trainer;

    try {
        trainer = await trainerService.getTrainerById(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!trainer) {
        response.sendStatus(404);
    } else {
        response.json(trainer);
    }
    next();
});


// Retrieves a list of trainer's batches based on trainer ID
trainerRouter.get('/:id/batch', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let batch: Batch[];

    try {
        batch = await trainerService.getBatchesByTrainerId(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    // Dao returns undefined for non-existent trainer
    if (!batch) {
        response.sendStatus(404);
    } else {
        response.json(batch);
    }
    next();
});

// Retrieves all projects belonging to a trainer/batch through via trainer ID
trainerRouter.get('/:id/batch/project', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let project: Project[];

    try {
        project = await trainerService.getProjectsByTrainerId(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    // Dao returns undefined for non-existent trainer
    if (!project) {
        response.sendStatus(404);
    } else {
        response.json(project);
    }
    next();
});

// Retrieves all associates belonging to a trainer/batch via trainer ID
trainerRouter.get('/:id/batch/associate', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let associate: Associate[];

    try {
        associate = await trainerService.getAssociatesByTrainerId(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    // Dao returns undefined for non-existent trainer
    if (!associate) {
        response.sendStatus(404);
    } else {
        response.json(associate);
    }
    next();
});

// Retrieves all teams on a specified project within a specificied batch via trainer and project ID
trainerRouter.get('/:id1/batch/project/:id2/team', async (request, response, next) => {
    const id1: number = parseInt(request.params.id1);
    const id2: number = parseInt(request.params.id2);
    let team: Team[];

    try {
        team = await trainerService.getTeamsByTrainerId(id1, id2);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    // Dao returns undefined for non-existent trainer or project
    if (!team) {
        response.sendStatus(404);
    } else {
        response.json(team);
    }
    next();
});


// Saves a new trainer object
trainerRouter.post('', async (request, response, next) => {
    const trainer = request.body;
    let newTrainer: Trainer;

    try {
        newTrainer = await trainerService.saveTrainer(trainer);
        response.status(201);
        response.json(newTrainer);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Updates an existing trainer
trainerRouter.patch('', async (request, response, next) => {
    const trainer = request.body;
    let updatedTrainer: Trainer;

    try {
    updatedTrainer = await trainerService.patchTrainer(trainer);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!updatedTrainer) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(updatedTrainer);
    }
    next();
});

// Deletes an existing trainer
trainerRouter.delete('/:id', async (request, response, next) => {
    const id = parseInt(request.params.id);
    let deletedTrainer: Trainer;

    try {
        deletedTrainer = await trainerService.deleteTrainer(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!deletedTrainer) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(deletedTrainer);
    }
    next();
});
