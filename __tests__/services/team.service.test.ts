import * as teamService from '../../src/services/team.service';
import * as teamDao from '../../src/daos/team.dao';
import { Team } from '../../src/models/Team';
import { TeamAssignment } from '../../src/models/TeamAssignment';


jest.mock('../../src/daos/team.dao');

const mockTeamDao = teamDao as any;

describe('saveTeam', () => {
    test('422 returned if no projectId provided', async () => {
        expect.assertions(1);

        mockTeamDao.saveTeam
            .mockImplementation(() => ({}));

        const payload = {
            teamName: 'Chase',
            techFocus: 'React',
            maxPeople: 100
        }

        try {
            await teamService.saveTeam(payload);
            fail('teamService.saveTeam did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no teamName is provided', async () => {
        expect.assertions(1);
        mockTeamDao.saveTeam
            .mockImplementation(() => ({}));

        const payload = {
            projectId: 100,
            techFocus: 'React',
            maxPeople: 100
        }

        try {
            await teamService.saveTeam(payload);
            fail('teamService.saveTeam did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no techFocus provided', async () => {
        expect.assertions(1);
        mockTeamDao.saveTeam
            .mockImplementation(() => ({}));

        const payload = {
            projectId: 100,
            teamName: 'Chase',
            maxPeople: 100
        }

        try {
            await teamService.saveTeam(payload);
            fail('teamService.saveTeam did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no maxPeople provided', async () => {
        expect.assertions(1);
        mockTeamDao.saveTeam
            .mockImplementation(() => ({}));

        const payload = {
            projectId: 100,
            teamName: 'Chase',
            techFocus: 'React'
        }

        try {
            await teamService.saveTeam(payload);
            fail('teamService.saveTeam did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Team object', async () => {
        expect.assertions(2);

        mockTeamDao.saveTeam
            .mockImplementation(o => o);

        const payload = {
            projectId: 100,
            teamName: 'Chase',
            techFocus: 'React',
            maxPeople: 100
        };

        const result = await teamService.saveTeam(payload);

        expect(payload).not.toBeInstanceOf(Team);
        expect(result).toBeInstanceOf(Team);
    });

    test('ID value of input is replaced in output', async () => {
        expect.assertions(1);


        mockTeamDao.saveTeam
            .mockImplementation(o => o);

        const payload = {
            id: 15,
            projectId: 100,
            teamName: 'Chase',
            techFocus: 'React',
            maxPeople: 100
        };

        const result = await teamService.saveTeam(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        expect.assertions(1);

        mockTeamDao.saveTeam
            .mockImplementation(o => o);

        const payload = {
            projectId: 100,
            teamName: 'Chase',
            techFocus: 'React',
            maxPeople: 100,
            foofoo: true
        };

        const result = await teamService.saveTeam(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});


describe('patchTeam', () => {
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockTeamDao.patchTeam
            .mockImplementation(() => ({}));

        const payload = {
            id: 1,
            projectId: 100,
            teamName: 'Chase',
            techFocus: 'React',
            maxPeople: 100
        };

        const result = await teamService.patchTeam(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockTeamDao.patchTeam
            .mockImplementation(() => ({}));

        const payload = {
            projectId: 100,
            teamName: 'Chase',
            techFocus: 'React',
            maxPeople: 100
        };

        try {
            await teamService.patchTeam(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});

describe('saveTeamAssignment', () => {
    test('422 returned if no teamId provided', async () => {
        expect.assertions(1);

        mockTeamDao.saveTeamAssignment
            .mockImplementation(() => ({}));

        const payload = {
            associateId: 100
        }

        try {
            await teamService.saveTeamAssignment(payload);
            fail('teamService.saveTeamAssignment did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no associateId is provided', async () => {
        expect.assertions(1);
        mockTeamDao.saveTeamAssignment
            .mockImplementation(() => ({}));

        const payload = {
            teamId: 100
        }

        try {
            await teamService.saveTeamAssignment(payload);
            fail('teamService.saveTeam did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Team object', async () => {
        expect.assertions(2);

        mockTeamDao.saveTeamAssignment
            .mockImplementation(o => o);

        const payload = {
            teamId: 100,
            associateId: 100
        };

        const result = await teamService.saveTeamAssignment(payload);

        expect(payload).not.toBeInstanceOf(TeamAssignment);
        expect(result).toBeInstanceOf(TeamAssignment);
    });


    test('Extraneous fields in input are not in output', async () => {
        expect.assertions(1);

        mockTeamDao.saveTeamAssignment
            .mockImplementation(o => o);

        const payload = {
            teamId: 100,
            associateId: 100,
            foofoo: true
        };

        const result = await teamService.saveTeamAssignment(payload) as any;

        expect(result.foofoo).not.toBeDefined();
    });
});