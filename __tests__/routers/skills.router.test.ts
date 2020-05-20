import express from 'express';
import bodyParser from 'body-parser';
import { skillRouter } from '../../src/routers/skill.router';
import * as skillService from '../../src/services/skill.service';
import request from 'supertest';

// Setup mock for skillService dependency
jest.mock('../../src/services/skill.service');
const mockSkillService = skillService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/skill', skillRouter);

describe('GET /skill', () => {
    test('Returns normally under normal circumstances', async () => {
        mockSkillService.getAllSkills
        .mockImplementation(async () => []);
        await request(app)
            .get('/skill')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Returns normally under normal circumstances', async () => {
        mockSkillService.getAllSkills.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/skill')
            .expect(500);
    });
});

describe('GET /skill/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockSkillService.getSkillById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/skill/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockSkillService.getSkillById
            .mockImplementation(async () => (undefined));

        await request(app)
            .get('/skill/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockSkillService.getSkillById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/skill/99')
            .expect(500)
    })
})

describe('POST /skill', () => {
    test('Successful creation should return 201 status', async () => {
        mockSkillService.saveSkill.mockImplementation(async () => ({}));
        const payload = {
            skillLevel: 'Master',
            technology: 'React'
        };

        await request(app)
            .post('/skill')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockSkillService.saveSkill.mockImplementation(async () => {throw new Error()});

        const payload = {
            skillLevel: 'Master',
            technology: 'React'
        };

        await request(app)
            .post('/skill')
            .send(payload)
            .expect(500);
    });
});


describe('PATCH /skill', () => {
    test('Successful update should return 201 status', async () => {

        mockSkillService.patchSkill
            .mockImplementation(async () => ({}));

        const payload = {
            skillLevel: 'Master',
            technology: 'React'
        };

        await request(app)
            .patch('/skill')
            .send(payload)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {

        mockSkillService.patchSkill
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            skillLevel: 'Master',
            technology: 'React'
        };

        await request(app)
            .patch('/skill')
            .send(payload)
            .expect(500);
    });

    test('No object found (404)', async() => {
        mockSkillService.patchSkill
            .mockImplementation(async () => (undefined));

        const payload = {
            skillLevel: 'Master',
            technology: 'React'
        };

        await request(app)
            .patch('/skill')
            .expect(404);
    });
});

describe('DELETE /skill/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockSkillService.deleteSkill
            .mockImplementation(async () => ({}));

        await request(app)
            .delete('/skill/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockSkillService.deleteSkill
            .mockImplementation(async () => (undefined));

        await request(app)
            .delete('/skill/1')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockSkillService.deleteSkill
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .delete('/skill/1')
            .expect(500)
    });
});