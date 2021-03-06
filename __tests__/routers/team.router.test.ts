import express from 'express';
import bodyParser from 'body-parser';
import { teamRouter } from '../../src/routers/team.router';
import * as teamService from '../../src/services/team.service';
import request from 'supertest';

// Setup mock for teamService dependency
jest.mock('../../src/services/team.service');
const mockTeamService = teamService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/team', teamRouter);

describe('GET /team', () => {
    test('Returns normally under normal circumstances', async () => {
        mockTeamService.getAllTeams
            .mockImplementation(async () => []);

        await request(app)
            .get('/team')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Returns normally under normal circumstances', async () => {
        mockTeamService.getAllTeams
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/team')
            .expect(500);
    });
    
});

describe('GET /team/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockTeamService.getTeamById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/team/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockTeamService.getTeamById
            .mockImplementation(async () => (undefined));

        await request(app)
            .get('/team/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockTeamService.getTeamById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/team/99')
            .expect(500)
    })
})

describe('GET /team/existing/assignment', () => {
    test('Normal behavior Json with status 200', async () => {
        mockTeamService.getAllTeamAssignments
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/team/existing/assignment')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('500 internal server error', async() => {
        mockTeamService.getAllTeamAssignments
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/team/existing/assignment')
            .expect(500)
    })
})

describe('GET /team/:id/associate', () => {
    test('Normal behavior Json with status 200', async () => {
        mockTeamService.getAssociatesByTeamId
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/team/100/associate')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockTeamService.getAssociatesByTeamId
            .mockImplementation(async () => (undefined));

        await request(app)
            .get('/team/100/associate')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockTeamService.getAssociatesByTeamId
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/team/100/associate')
            .expect(500)
    })
})

describe('POST /team', () => {
    test('Successful creation should return 201 status', async () => {
        mockTeamService.saveTeam
            .mockImplementation(async () => ({}));

            const payload = {
            projectId: 1,
            teamName: 'team 1',
            techFocus: 'hacking',
            maxPeople: 100
        };

        await request(app)
            .post('/team')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockTeamService.saveTeam.mockImplementation(async () => {throw new Error()});

        const payload = {
            projectId: 1,
            teamName: 'team 1',
            techFocus: 'hacking',
            maxPeople: 100
        };

        await request(app)
            .post('/team')
            .send(payload)
            .expect(500);
    });
});

describe('POST /team/assignment', () => {
    test('Successful creation should return 201 status', async () => {
        mockTeamService.saveTeamAssignment
            .mockImplementation(async () => ({}));

            const payload = {
            teamId: 100,
            associateId: 100
        };

        await request(app)
            .post('/team/assignment')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockTeamService.saveTeamAssignment.mockImplementation(async () => {throw new Error()});

        const payload = {
            teamId: 100,
            associateId: 100
        };

        await request(app)
            .post('/team/assignment')
            .send(payload)
            .expect(500);
    });
});

describe('PATCH /team', () => {
    test('Successful update should return 201 status', async () => {

        mockTeamService.patchTeam
            .mockImplementation(async () => ({}));

        const payload = {
            projectId: 1,
            teamName: 'team 1',
            techFocus: 'hacking',
            maxPeople: 100
        };

        await request(app)
            .patch('/team')
            .send(payload)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {

        mockTeamService.patchTeam
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            projectId: 1,
            teamName: 'team 1',
            techFocus: 'hacking',
            maxPeople: 100
        };

        await request(app)
            .patch('/team')
            .send(payload)
            .expect(500);
    });

    test('No object found (404)', async() => {
        mockTeamService.patchTeam
            .mockImplementation(async () => (undefined));

        const payload = {
            projectId: 1,
            teamName: 'team 1',
            techFocus: 'hacking',
            maxPeople: 100
        };

        await request(app)
            .patch('/team')
            .expect(404);
    });
});

describe('DELETE /team/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockTeamService.deleteTeam
            .mockImplementation(async () => ({}));

        await request(app)
            .delete('/team/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockTeamService.deleteTeam
            .mockImplementation(async () => (undefined));

        await request(app)
            .delete('/team/1')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockTeamService.deleteTeam
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .delete('/team/1')
            .expect(500)
    });
});


