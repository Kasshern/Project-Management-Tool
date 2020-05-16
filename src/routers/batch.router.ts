import express from 'express';
import * as batchService from '../services/batch.service';
import { Batch } from '../models/Batch';

export const batchRouter = express.Router();

batchRouter.get('', async (request, response, next) => {

    let batches: Batch[];

    try {
        batches = await batchService.getAllBatches();
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
        return;
    }

    if (!batches) {
        response.sendStatus(404);
    } else {
        response.json(batches);
    }
    next();
});

batchRouter.get('/:id', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let batch: Batch;

    try {
        batch = await batchService.getBatchById(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!batch) {
        response.sendStatus(404);
    } else {
        response.json(batch);
    }
    next();
});

batchRouter.post('', async (request, response, next) => {
    const batch = request.body;

    try {
        await batchService.saveBatch(batch);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

batchRouter.patch('', async (request, response, next) => {
    const batch = request.body;
    let updatedBatch: Batch;

    try {
    updatedBatch = await batchService.patchBatch(batch);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (updatedBatch) {
        response.sendStatus(201);
        response.json(updatedBatch);
    } else {
        response.status(404);
    }
    next();
});

batchRouter.delete('/:id', async (request, response, next) => {
    const id = parseInt(request.params.id);
    let deletedBatch: Batch;

    try {
        deletedBatch = await batchService.deleteBatch(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!deletedBatch) {
        response.sendStatus(404);
    } else {
        response.json(deletedBatch);
    }
    next();
});

