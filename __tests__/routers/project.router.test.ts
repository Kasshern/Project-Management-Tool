import express from 'express';
import bodyParser from 'body-parser';
import { projectRouter } from '../../src/routers/project.router';
import * as projectService from '../../src/services/project.service';
import request from 'supertest';

// Setup mock for projectService dependency
jest.mock('../../src/services/project.service');
const mockProjectService = projectService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/project', projectRouter);

describe('GET /project', () => {
    test('Returns normally under normal circumstances', async () => {
        mockProjectService.getAllProjects
            .mockImplementation(async () => []);
        await request(app)
            .get('/project')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Returns normally under normal circumstances', async () => {
        mockProjectService.getAllProjects
            .mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/project')
            .expect(500);
    });
});

describe('GET /project/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockProjectService.getProjectById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/project/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockProjectService.getProjectById
            .mockImplementation(async () => (undefined));

        await request(app)
            .get('/project/1')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockProjectService.getProjectById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/project/1')
            .expect(500)
    })
})

describe('POST /project', () => {
    test('Successful creation should return 201 status', async () => {
        mockProjectService.saveProject
            .mockImplementation(async () => ({}));

        const payload = {
            batchId: 100,
            projectName: 'Project 100',
            goal: 'take over the world',
            maxTeams: 100
        };

        await request(app)
            .post('/project')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockProjectService.saveProject
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            batchId: 100,
            projectName: 'Project 100',
            goal: 'take over the world',
            maxTeams: 100
        };

        await request(app)
            .post('/project')
            .send(payload)
            .expect(500);
    });
});

describe('PATCH /project', () => {
    test('Successful update should return 201 status', async () => {

        mockProjectService.patchProject
            .mockImplementation(async () => ({}));

        const payload = {
            batchId: 100,
            projectName: 'Project 100',
            goal: 'take over the world',
            maxTeams: 100
        };

        await request(app)
            .patch('/project')
            .send(payload)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {

        mockProjectService.patchProject
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            batchId: 100,
            projectName: 'Project 100',
            goal: 'take over the world',
            maxTeams: 100
        };

        await request(app)
            .patch('/project')
            .send(payload)
            .expect(500);
    });

    test('No object found (404)', async() => {
        mockProjectService.patchProject
            .mockImplementation(async () => (undefined));

        const payload = {
            batchId: 100,
            projectName: 'Project 100',
            goal: 'take over the world',
            maxTeams: 100
        };

        await request(app)
            .patch('/project')
            .expect(404);
    });
});

describe('DELETE /project/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockProjectService.deleteProject
            .mockImplementation(async () => ({}));

        await request(app)
            .delete('/project/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockProjectService.deleteProject
            .mockImplementation(async () => (undefined));

        await request(app)
            .delete('/project/1')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockProjectService.deleteProject
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .delete('/project/1')
            .expect(500)
    });
});