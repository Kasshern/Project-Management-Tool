import express from 'express';
import bodyParser from 'body-parser';
import { batchRouter } from '../../src/routers/batch.router';
import * as batchService from '../../src/services/batch.service';
import request from 'supertest';

// Setup mock for batchService dependency
jest.mock('../../src/services/batch.service');
const mockBatchService = batchService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/batch', batchRouter);

describe('GET /batch', () => {
    test('Returns normally under normal circumstances', async () => {
        mockBatchService.getAllBatches.mockImplementation(async () => []);
        await request(app)
            .get('/batch')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Returns normally under normal circumstances', async () => {
        mockBatchService.getAllBatches.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/batch')
            .expect(500);
    });
});

describe('GET /batch/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockBatchService.getBatchById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/batch/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockBatchService.getBatchById
            .mockImplementation(async () => (undefined));

        await request(app)
            .get('/batch/1')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockBatchService.getBatchById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/batch/1')
            .expect(500)
    })
})

describe('POST /batch', () => {
    test('Successful creation should return 201 status', async () => {
        mockBatchService.saveBatch.mockImplementation(async () => ({}));
        const payload = {
            trainerId: 100,
            batchName: 'Batch 1',
            startDate: '2020-01-01',
            durationInDays: '100 days'
        };

        await request(app)
            .post('/batch')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockBatchService.saveBatch
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            trainerId: 100,
            batchName: 'Batch 1',
            startDate: '2020-01-01',
            durationInDays: '100 days'
        };

        await request(app)
            .post('/batch')
            .send(payload)
            .expect(500);
    });
});



describe('PATCH /batch', () => {
    test('Successful update should return 201 status', async () => {

        mockBatchService.patchBatch
            .mockImplementation(async () => ({}));

        const payload = {
            trainerId: 100,
            batchName: 'Batch 1',
            startDate: '2020-01-01',
            durationInDays: '100 days'
        };

        await request(app)
            .patch('/batch')
            .send(payload)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {

        mockBatchService.patchBatch
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            trainerId: 100,
            batchName: 'Batch 1',
            startDate: '2020-01-01',
            durationInDays: '100 days'
        };

        await request(app)
            .patch('/batch')
            .send(payload)
            .expect(500);
    });

    test('No object found (404)', async() => {
        mockBatchService.patchBatch
            .mockImplementation(async () => (undefined));

        const payload = {
            trainerId: 100,
            batchName: 'Batch 1',
            startDate: '2020-01-01',
            durationInDays: '100 days'
        };

        await request(app)
            .patch('/batch')
            .expect(404);
    });
});

describe('DELETE /batch/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockBatchService.deleteBatch
            .mockImplementation(async () => ({}));

        await request(app)
            .delete('/batch/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockBatchService.deleteBatch
            .mockImplementation(async () => (undefined));

        await request(app)
            .delete('/batch/1')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockBatchService.deleteBatch
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .delete('/batch/1')
            .expect(500)
    });
});