import express from 'express';
import * as trainerService from '../services/trainer.service';
import { Trainer } from '../models/Trainer';

export const trainerRouter = express.Router();

trainerRouter.get('', async (request, response, next) => {

    let trainers: Trainer[];

    try {
        trainers = await trainerService.getAllTrainers();
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
        return;
    }

    if (!trainers) {
        response.sendStatus(404);
    } else {
        response.json(trainers);
    }
    next();
});

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

trainerRouter.post('', async (request, response, next) => {
    const trainer = request.body;

    try {
        await trainerService.saveTrainer(trainer);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

trainerRouter.patch('', async (request, response, next) => {
    const trainer = request.body;
    let updatedTrainer: Trainer;

    try {
    updatedTrainer = await trainerService.patchTrainer(trainer);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (updatedTrainer) {
        response.sendStatus(201);
        response.json(updatedTrainer);
    } else {
        response.status(404);
    }
    next();
});

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
        response.json(deletedTrainer);
    }
    next();
});

