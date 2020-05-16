import * as associateService from '../../src/services/associate.service';
import * as associateDao from '../../src/daos/associate.dao';
import { Associate } from '../../src/models/Associate';


jest.mock('../../src/daos/associate.dao');

const mockAssociateDao = associateDao as any;

describe('saveAssociate', () => {
    test('422 returned if no firstName provided', async () => {
        expect.assertions(1);

        mockAssociateDao.saveAssociate
            .mockImplementation(() => ({}));

        const payload = {
            lastName: 'Chase',
            birthdate: '2020-01-01'
        }

        try {
            await associateService.saveAssociate(payload);
            fail('associateService.saveAssociate did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no birthdate is provided', async () => {
        expect.assertions(1);
        mockAssociateDao.saveAssociate
            .mockImplementation(() => ({}));

        const payload = {
            lastName: 'Smith',
            firstName: 'John'
        }

        try {
            await associateService.saveAssociate(payload);
            fail('associateService.saveAssociate did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no lastName provided', async () => {
        expect.assertions(1);
        mockAssociateDao.saveAssociate
            .mockImplementation(() => ({}));

        const payload = {
            firstName: 'John',
            birthdate: '2020-01-01'
        }

        try {
            await associateService.saveAssociate(payload);
            fail('associateService.saveAssociate did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Associate object', async () => {
        expect.assertions(2);

        mockAssociateDao.saveAssociate
            .mockImplementation(o => o);

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01'
        };

        const result = await associateService.saveAssociate(payload);

        expect(payload).not.toBeInstanceOf(Associate);
        expect(result).toBeInstanceOf(Associate);
    });

    test('ID value of input is replaced in output', async () => {
        expect.assertions(1);

        mockAssociateDao.saveAssociate
            .mockImplementation(o => o);

        const payload = {
            id: 15,
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01'
        };

        const result = await associateService.saveAssociate(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        expect.assertions(1);

        mockAssociateDao.saveAssociate
            .mockImplementation(o => o);

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01',
            likesSkateboards: true
        };

        const result = await associateService.saveAssociate(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});

describe('patchAssociate', () => {
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockAssociateDao.patchAssociate
            .mockImplementation(() => ({}));

        const payload = {
            id: 1,
            firstName: 'Abby',
            lastName: 'Adams',
            birthdate: '2020-01-01'
        };

        const result = await associateService.patchAssociate(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockAssociateDao.patchAssociate
            .mockImplementation(() => ({}));

        const payload = {
            firstName: 'Abby',
            lastName: 'Adams',
            birthdate: '2020-01-01'
        };

        try {
            await associateService.patchAssociate(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});