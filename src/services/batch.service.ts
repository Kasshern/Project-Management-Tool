import { Batch } from '../models/Batch';
import * as batchDao from '../daos/batch.dao';


export function getAllBatches(): Promise<Batch[]> {
    return batchDao.getAllBatches();
}

export function getBatchById(id: number): Promise<Batch> {
    return batchDao.getBatchById(id);
}

export function saveBatch(batch: any): Promise<Batch> {
    const newBatch = new Batch(
        undefined,
        batch.trainerId,
        batch.batchName,
        new Date(batch.startDate),
        batch.durationInDays
    );

    // Validate new batch properties
    if (batch.trainerId && batch.batchName &&
        batch.startDate && batch.durationInDays) {
        return batchDao.saveBatch(newBatch);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchBatch(input: any): Promise<Batch> {
const startDate = input.startDate && new Date(input.startDate);

const batch = new Batch(
    input.id,
    input.trainerId,
    input.batchName,
    startDate,
    input.durationInDays
);

// Check that new batch is a valid id
if (!batch.id) {
    throw new Error ('400');
}

return batchDao.patchBatch(batch);
}

export function deleteBatch(id: number): Promise<Batch> {
        return batchDao.deleteBatch(id);
}
