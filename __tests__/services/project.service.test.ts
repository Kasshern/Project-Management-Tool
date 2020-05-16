import * as projectService from '../../src/services/project.service';
import * as projectDao from '../../src/daos/project.dao';
import { Project } from '../../src/models/Project';


jest.mock('../../src/daos/project.dao');

const mockProjectDao = projectDao as any;

describe('saveProject', () => {
    test('422 returned if no batchId provided', async () => {
        expect.assertions(1);

        mockProjectDao.saveProject
            .mockImplementation(() => ({}));

        const payload = {
            projectName: 'Chase',
            goal: 'Create API',
            maxTeams: 100
        }

        try {
            await projectService.saveProject(payload);
            fail('projectService.saveProject did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no projectName is provided', async () => {
        expect.assertions(1);
        mockProjectDao.saveProject
            .mockImplementation(() => ({}));

        const payload = {
            batchId: 100,
            goal: 'Create API',
            maxTeams: 100
        }

        try {
            await projectService.saveProject(payload);
            fail('projectService.saveProject did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no goal provided', async () => {
        expect.assertions(1);
        mockProjectDao.saveProject
            .mockImplementation(() => ({}));

        const payload = {
            batchId: 100,
            projectName: 'project 100',
            maxTeams: 100
        }

        try {
            await projectService.saveProject(payload);
            fail('projectService.saveProject did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no maxTeams provided', async () => {
        expect.assertions(1);
        mockProjectDao.saveProject
            .mockImplementation(() => ({}));

        const payload = {
            batchId: 100,
            projectName: 'Project 100',
            goal: 'Create API'
        }

        try {
            await projectService.saveProject(payload);
            fail('projectService.saveProject did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Project object', async () => {
        expect.assertions(2);

        mockProjectDao.saveProject
            .mockImplementation(o => o);

        const payload = {
            batchId: 100,
            projectName: 'Project 100',
            goal: 'Create API',
            maxTeams: 100
        };

        const result = await projectService.saveProject(payload);

        expect(payload).not.toBeInstanceOf(Project);
        expect(result).toBeInstanceOf(Project);
    });

    test('ID value of input is replaced in output', async () => {
        expect.assertions(1);

        mockProjectDao.saveProject
            .mockImplementation(o => o);

        const payload = {
            id: 15,
            batchId: 100,
            projectName: 'Project 100',
            goal: 'Create API',
            maxTeams: 100
        };

        const result = await projectService.saveProject(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        expect.assertions(1);

        mockProjectDao.saveProject
            .mockImplementation(o => o);

        const payload = {
            batchId: 100,
            projectName: 'Project 100',
            goal: 'Create API',
            maxTeams: 100,
            foofoo: true
        };

        const result = await projectService.saveProject(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});


describe('patchProject', () => {
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockProjectDao.patchProject
            .mockImplementation(() => ({}));

        const payload = {
            id: 1,
            batchId: 100,
            projectName: 'Project 100',
            goal: 'Create API',
            maxTeams: 100
        };

        const result = await projectService.patchProject(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockProjectDao.patchProject
            .mockImplementation(() => ({}));

        const payload = {
            batchId: 100,
            projectName: 'Project 100',
            goal: 'Create API',
            maxTeams: 100
        };

        try {
            await projectService.patchProject(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});