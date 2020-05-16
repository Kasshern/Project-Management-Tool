import * as trainerService from '../../src/services/trainer.service';
import * as trainerDao from '../../src/daos/trainer.dao';
import { Trainer } from '../../src/models/Trainer';

/*
    Mocks the imported module
    The mocked module will allow us to
    stub methods - essentially replacing the
    original behavior with explicitly provided
    behavior such that our tests will not
    test the original behavior of this dependency
*/

jest.mock('../../src/daos/trainer.dao');

const mockTrainerDao = trainerDao as any;

describe('saveTrainer', () => {
    test('422 returned if no firstName provided', async () => {
        expect.assertions(1);
        mockTrainerDao.saveTrainer.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            lastName: 'Chase',
            birthdate: '2020-01-01'
        }

        try {
            // This async function should reject due to missing firstName
            await trainerService.saveTrainer(payload);
            fail('trainerService.saveTrainer did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no birthdate is provided', async () => {
        // peopleDao.saveTrainer will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockTrainerDao.saveTrainer.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            lastName: 'Smith',
            firstName: 'John'
        }

        try {
            // This async function should reject due to missing firstName
            await trainerService.saveTrainer(payload);
            fail('trainerService.saveTrainer did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no lastName provided', async () => {
        // peopleDao.saveTrainer will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockTrainerDao.saveTrainer.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            firstName: 'John',
            birthdate: '2020-01-01'
        }

        try {
            // This async function should reject due to missing firstName
            await trainerService.saveTrainer(payload);
            fail('trainerService.saveTrainer did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('Input object transformed to Trainer object', async () => {
        mockTrainerDao.saveTrainer.mockImplementation(o => o);

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
        mockTrainerDao.saveTrainer.mockImplementation(o => o);

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
        mockTrainerDao.saveTrainer.mockImplementation(o => o);

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
    /* Testing behavior of patchPerson */
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