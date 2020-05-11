import express from 'express';
import * as trainerService from '../services/trainer.service';

export const trainerRouter = express.Router();

trainerRouter.get('', (request, response, next) => {
    trainerService.getAllTrainers().then(trainers => {
        response.json(trainers);
        next();
    }).catch(err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        response.sendStatus(500);
    });
});

trainerRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    trainerService.getTrainerById(id).then(trainer => {
        if (!trainer) {
            response.sendStatus(404);
        } else {
            response.json(trainer);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

trainerRouter.post('', (request, response, next) => {
    const trainer = request.body;
    trainerService.saveTrainer(trainer)
        .then(newTrainer => {
            response.status(201);
            response.json(newTrainer);
            next();
        }).catch(err => {
            // tslint:disable-next-line: no-console
            console.log(err);
            response.sendStatus(500);
            next();
        });
});


trainerRouter.patch('',(request, response, next) => {
    const trainer = request.body;
    trainerService.patchTrainer(trainer)
    .then(updatedTrainer => {
        if(updatedTrainer) {
            response.status(201);
            response.json(updatedTrainer);
            next();
        } else {
            response.sendStatus(404);
        }
    }).catch(err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    });
});

trainerRouter.delete('/:id', (request, response, next) => {
    const id = +request.params.id;
    trainerService.deleteTrainer(id).then(trainer => {
        if(!trainer) {
            response.status(404);
        } else {
            response.json(trainer);
        }
        next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

