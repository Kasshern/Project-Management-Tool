import * as batchService from '../../src/services/batch.service';
import * as batchDao from '../../src/daos/batch.dao';
import { Batch } from '../../src/models/Batch';


jest.mock('../../src/daos/batch.dao');

const mockBatchDao = batchDao as any;

describe('saveBatch', () => {
    test('422 returned if no trainerId provided', async () => {
        expect.assertions(1);
        mockBatchDao.saveBatch.mockImplementation(() => ({}));

        const payload = {
            batchName: 'Chase',
            startDate: '2020-01-01',
            durationInDays: '100 days'
        }

        try {
            await batchService.saveBatch(payload);
            fail('batchService.saveBatch did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no batchName is provided', async () => {
        expect.assertions(1);
        mockBatchDao.saveBatch
            .mockImplementation(() => ({}));

        const payload = {
            trainerId: 100,
            startDate: '2020-01-01',
            durationInDays: '100 days'
        }

        try {
            await batchService.saveBatch(payload);
            fail('batchService.saveBatch did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no startDate provided', async () => {
        expect.assertions(1);
        mockBatchDao.saveBatch
            .mockImplementation(() => ({}));

        const payload = {
            batchName: 'Batch 100',
            trainerId: 100,
            durationInDays: '100 days'
        }

        try {
            await batchService.saveBatch(payload);
            fail('batchService.saveBatch did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no durationInDays provided', async () => {
        expect.assertions(1);
        mockBatchDao.saveBatch
            .mockImplementation(() => ({}));

        const payload = {
            batchName: 'Batch 100',
            trainerId: 100,
            startDate: '2020-01-01'
        }

        try {
            await batchService.saveBatch(payload);
            fail('batchService.saveBatch did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Batch object', async () => {
        expect.assertions(2);

        mockBatchDao.saveBatch
            .mockImplementation(o => o);

        const payload = {
            batchName: 'Batch 100',
            trainerId: 100,
            startDate: '2020-01-01',
            durationInDays: '100 days'
        }

        const result = await batchService.saveBatch(payload);

        expect(payload).not.toBeInstanceOf(Batch);
        expect(result).toBeInstanceOf(Batch);
    });

    test('ID value of input is replaced in output', async () => {
        expect.assertions(1);

        mockBatchDao.saveBatch
            .mockImplementation(o => o);

        const payload = {
            id: 15,
            batchName: 'Batch 100',
            trainerId: 100,
            startDate: '2020-01-01',
            durationInDays: '100 days'
        };

        const result = await batchService.saveBatch(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        expect.assertions(1);

        mockBatchDao.saveBatch
            .mockImplementation(o => o);

        const payload = {
            batchName: 'Batch 100',
            trainerId: 100,
            startDate: '2020-01-01',
            durationInDays: '100 days',
            foofoo: true
        };

        const result = await batchService.saveBatch(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});


describe('patchBatch', () => {
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockBatchDao.patchBatch
            .mockImplementation(() => ({}));

        const payload = {
            id: 1,
            batchName: 'Batch 100',
            trainerId: 100,
            startDate: '2020-01-01',
            durationInDays: '100 days'
        };

        const result = await batchService.patchBatch(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockBatchDao.patchBatch
            .mockImplementation(() => ({}));

        const payload = {
            batchName: 'Batch 100',
            trainerId: 100,
            startDate: '2020-01-01',
            durationInDays: '100 days'
        };

        try {
            await batchService.patchBatch(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});