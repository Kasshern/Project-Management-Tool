import express from 'express';
import bodyParser from 'body-parser';
import { associateRouter } from '../../src/routers/associate.router';
import * as associateService from '../../src/services/associate.service';
import request from 'supertest';

// Setup mock for associateService dependency
jest.mock('../../src/services/associate.service');
const mockAssociateService = associateService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/associate', associateRouter);

describe('GET /associate', () => {
    test('Returns normally under normal circumstances', async () => {
        mockAssociateService.getAllAssociates.mockImplementation(async () => []);
        await request(app)
            .get('/associate')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Returns normally under normal circumstances', async () => {
        mockAssociateService.getAllAssociates.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/associate')
            .expect(500);
    });
});

describe('GET /associate/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockAssociateService.getAssociateById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/associate/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockAssociateService.getAssociateById
            .mockImplementation(async () => (undefined));

        await request(app)
            .get('/associate/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockAssociateService.getAssociateById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/associate/99')
            .expect(500)
    })
})

describe('GET /associate/:id/skill', () => {
    test('Returns normally under normal circumstances', async () => {
        mockAssociateService.getSkillsByAssociateId.mockImplementation(async () => []);
        await request(app)
            .get('/associate/100/skill')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('No object found (404)', async() => {
        mockAssociateService.getSkillsByAssociateId
            .mockImplementation(async () => (undefined));

        await request(app)
            .get('/associate/100/skill')
            .expect(404);
    });

    test('Returns normally under normal circumstances', async () => {
        mockAssociateService.getSkillsByAssociateId.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/associate/100/skill')
            .expect(500);
    });
});

describe('POST /associate', () => {
    test('Successful creation should return 201 status', async () => {
        mockAssociateService.saveAssociate.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .post('/associate')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockAssociateService.saveAssociate.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .post('/associate')
            .send(payload)
            .expect(500);
    });
});

describe('POST /associate/assignSkill', () => {
    test('Successful creation should return 201 status', async () => {
        mockAssociateService.saveAssociateSkill.mockImplementation(async () => ({}));
        const payload = {
            associateId: 100,
            skillId: 100
        };

        await request(app)
            .post('/associate/assignSkill')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockAssociateService.saveAssociateSkill.mockImplementation(async () => {throw new Error()});

        const payload = {
            associateId: 100,
            skillId: 100
        };

        await request(app)
            .post('/associate/assignSkill')
            .send(payload)
            .expect(500);
    });
});

describe('PATCH /associate', () => {
    test('Successful update should return 201 status', async () => {

        mockAssociateService.patchAssociate
            .mockImplementation(async () => ({}));

        const payload = {
            id: 1,
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .patch('/associate')
            .send(payload)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockAssociateService.patchAssociate
            .mockImplementation(async () => (undefined));

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .patch('/associate')
            .send(payload)
            .expect(404);
    });

    test('Should return 500 when encountering an error', async () => {

        mockAssociateService.patchAssociate
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .patch('/associate')
            .send(payload)
            .expect(500);
    });

});

describe('DELETE /associate/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockAssociateService.deleteAssociate
            .mockImplementation(async () => ({}));

        await request(app)
            .delete('/associate/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockAssociateService.deleteAssociate
            .mockImplementation(async () => (undefined));

        await request(app)
            .delete('/associate/1')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockAssociateService.deleteAssociate
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .delete('/associate/1')
            .expect(500)
    });
});


