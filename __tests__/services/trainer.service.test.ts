import * as trainerService from '../../src/services/trainer.service';
import * as trainerDao from '../../src/daos/trainer.dao';
import { Trainer } from '../../src/models/Trainer';


jest.mock('../../src/daos/trainer.dao');

const mockTrainerDao = trainerDao as any;

describe('saveTrainer', () => {
    test('422 returned if no firstName provided', async () => {
        expect.assertions(1);

        mockTrainerDao.saveTrainer
            .mockImplementation(() => ({}));

        const payload = {
            lastName: 'Chase',
            birthdate: '2020-01-01'
        }

        try {
            await trainerService.saveTrainer(payload);
            fail('trainerService.saveTrainer did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no birthdate is provided', async () => {
        expect.assertions(1);
        mockTrainerDao.saveTrainer
        .mockImplementation(() => ({}));

        const payload = {
            lastName: 'Smith',
            firstName: 'John'
        }

        try {
            await trainerService.saveTrainer(payload);
            fail('trainerService.saveTrainer did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no lastName provided', async () => {
        expect.assertions(1);
        mockTrainerDao.saveTrainer
            .mockImplementation(() => ({}));

        const payload = {
            firstName: 'John',
            birthdate: '2020-01-01'
        }

        try {
            await trainerService.saveTrainer(payload);
            fail('trainerService.saveTrainer did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Trainer object', async () => {
        expect.assertions(2);

        mockTrainerDao.saveTrainer
            .mockImplementation(o => o);

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01'
        };

        const result = await trainerService.saveTrainer(payload);

        expect(payload).not.toBeInstanceOf(Trainer);
        expect(result).toBeInstanceOf(Trainer);
    });

    test('ID value of input is replaced in output', async () => {
        expect.assertions(1);

        mockTrainerDao.saveTrainer
            .mockImplementation(o => o);

        const payload = {
            id: 15,
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01'
        };

        const result = await trainerService.saveTrainer(payload);
        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        expect.assertions(1);

        mockTrainerDao.saveTrainer
            .mockImplementation(o => o);

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01',
            likesSkateboards: true
        };

        const result = await trainerService.saveTrainer(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});


describe('patchTrainer', () => {
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockTrainerDao.patchTrainer
            .mockImplementation(() => ({}));

        const payload = {
            id: 1,
            firstName: 'Abby',
            lastName: 'Adams',
            birthdate: '2020-01-01'
        };

        const result = await trainerService.patchTrainer(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockTrainerDao.patchTrainer
            .mockImplementation(() => ({}));

        const payload = {
            firstName: 'Abby',
            lastName: 'Adams',
            birthdate: '2020-01-01'
        };

        try {
            await trainerService.patchTrainer(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});

describe('getAllTrainers', () => {
    test('succesful get of all trainers', async () => {
        expect.assertions(1);

        mockTrainerDao.getAllTrainers
            .mockImplementation(() => ({}));


        const result = await trainerService.getAllTrainers();
            expect(result).toBeDefined();
        });
    });

describe('getTrainerById', () => {
    test('succesful get a trainer by ID', async () => {
        expect.assertions(1);

        mockTrainerDao.getTrainerById
            .mockImplementation(() => ({}));

        const id: number = 100;

        const result = await trainerService.getTrainerById(id);
            expect(result).toBeDefined();
        });

});

/*
describe('getBatchesByTrainerId', () => {
    test('succesful get of all trainers', async () => {
        expect.assertions(1);

        mockTrainerDao.getAllTrainers
            .mockImplementation(() => ({}));


        const result = await trainerService.getAllTrainers();
            expect(result).toBeDefined();
        });
    });

    
describe('getProjectsByTrainerId', () => {
    test('succesful get of all trainers', async () => {
        expect.assertions(1);

        mockTrainerDao.getAllTrainers
            .mockImplementation(() => ({}));


        const result = await trainerService.getAllTrainers();
            expect(result).toBeDefined();
        });
    });

describe('getTeamsByTrainerId', () => {
    test('succesful get of all trainers', async () => {
        expect.assertions(1);

        mockTrainerDao.getAllTrainers
            .mockImplementation(() => ({}));


        const result = await trainerService.getAllTrainers();
            expect(result).toBeDefined();
        });
    });
*/