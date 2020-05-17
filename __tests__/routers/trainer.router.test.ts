import express from 'express';
import bodyParser from 'body-parser';
import { trainerRouter } from '../../src/routers/trainer.router';
import * as trainerService from '../../src/services/trainer.service';
import request from 'supertest';

// Setup mock for trainerService dependency
jest.mock('../../src/services/trainer.service');
const mockTrainerService = trainerService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/trainer', trainerRouter);

describe('GET /trainer', () => {
    test('Returns normally under normal circumstances', async () => {

        mockTrainerService.getAllTrainers
            .mockImplementation(async () => []);
        await request(app)
            .get('/trainer')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('No object found (404)', async() => {
        mockTrainerService.getAllTrainers
            .mockImplementation(async () => (0));

        await request(app)
            .get('/trainer')
            .expect(404);
    });

    test('Returns normally under normal circumstances', async () => {

        mockTrainerService.getAllTrainers
            .mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/trainer')
            .expect(500);
    });

    
});

describe('POST /trainer', () => {
    test('Successful creation should return 201 status', async () => {

        mockTrainerService.saveTrainer
            .mockImplementation(async () => ({}));
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .post('/trainer')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {

        mockTrainerService.saveTrainer
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .post('/trainer')
            .send(payload)
            .expect(500);
    });
});

describe('GET /trainer/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockTrainerService.getTrainerById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/trainer/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockTrainerService.getTrainerById
            .mockImplementation(async () => (0));

        await request(app)
            .get('/trainer/1')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockTrainerService.getTrainerById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/trainer/1')
            .expect(500)
    })
})

describe('PATCH /trainer', () => {
    test('Successful update should return 201 status', async () => {
        mockTrainerService.patchTrainer
            .mockImplementation(async () => ({}));

        const payload = {
            id: 1,
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .patch('/trainer')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockTrainerService.patchTrainer
            .mockImplementation(async () => (0));

        await request(app)
            .patch('/trainer')
            .expect(404);
        });

    test('Should return 500 when encountering an error', async () => {

        mockTrainerService.patchTrainer
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            id: 1,
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .patch('/trainer')
            .send(payload)
            .expect(500);
    });
});

describe('DELETE /trainer/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockTrainerService.deleteTrainer
            .mockImplementation(async () => ({}));

        await request(app)
            .delete('/trainer/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockTrainerService.deleteTrainer
            .mockImplementation(async () => (0));

        await request(app)
            .delete('/trainer/1')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockTrainerService.deleteTrainer
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .delete('/trainer/1')
            .expect(500)
    });
});