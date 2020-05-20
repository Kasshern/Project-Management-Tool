import { Trainer } from '../models/Trainer';
import * as trainerDao from '../daos/trainer.dao';
import { Batch } from '../models/Batch';
import { Project } from '../models/Project';
import { Team } from '../models/Team';
import { Associate } from '../models/Associate';


export function getAllTrainers(): Promise<Trainer[]> {
    return trainerDao.getAllTrainers();
}

export function getTrainerById(id: number): Promise<Trainer> {
    return trainerDao.getTrainerById(id);
}

export function getBatchesByTrainerId(id: number): Promise<Batch[]> {
    return trainerDao.getBatchesByTrainerId(id);
}

export function getProjectsByTrainerId(id: number): Promise<Project[]> {
    return trainerDao.getProjectsByTrainerId(id);
}

export function getAssociatesByTrainerId(id: number): Promise<Associate[]> {
    return trainerDao.getAssociatesByTrainerId(id);
}

export function getTeamsByTrainerId(id1: number, id2: number): Promise<Team[]> {
    return trainerDao.getTeamsByTrainerId(id1, id2);
}

export function saveTrainer(trainer: any): Promise<Trainer> {
    const newTrainer = new Trainer(
        undefined, trainer.firstName,
        trainer.lastName, new Date(trainer.birthdate)
    );
    // Validate new trainer properties
    if (trainer.firstName && trainer.lastName && trainer.birthdate) {
        return trainerDao.saveTrainer(newTrainer);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchTrainer(input: any): Promise<Trainer> {
const birthdate = input.birthdate && new Date(input.birthdate);

const trainer = new Trainer(
    input.id, input.firstName,
    input.lastName, birthdate
);

// Check that new trainer is a valid id
if (!trainer.id) {
    throw new Error ('400');
}

return trainerDao.patchTrainer(trainer);
}

export function deleteTrainer(id: number): Promise<Trainer> {
        return trainerDao.deleteTrainer(id);
}
