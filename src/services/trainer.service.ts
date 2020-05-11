import { Trainer } from '../models/Trainer';
import * as trainerDao from '../daos/trainer.dao';


export function getAllTrainers(): Promise<Trainer[]> {
    return trainerDao.getAllTrainers();
}

export function getTrainerById(id: number): Promise<Trainer> {
    return trainerDao.getTrainerById(id);
}

export function saveTrainer(trainer: any): Promise<Trainer> {
    const newTrainer = new Trainer(
        undefined, trainer.firstName,
        trainer.lastName, new Date(trainer.birthdate)
    );

   if (trainer.firstName && trainer.lastName && trainer.birthdate) {
        return trainerDao.saveTrainer(newTrainer);
    } else {
        console.warn('Invalid Trainer');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchTrainer(input: any): Promise<Trainer> {
const birthdate = input.birthdate && new Date(input.birthdate);

const trainer = new Trainer(
    input.id, input.trainerId,
    input.lastName, birthdate
);

if (!trainer.id) {
    throw new Error ('400');
}

return trainerDao.patchTrainer(trainer);
}

export function deleteTrainer(id: number): Promise<Trainer> {
        return trainerDao.deleteTrainer(id);
}
