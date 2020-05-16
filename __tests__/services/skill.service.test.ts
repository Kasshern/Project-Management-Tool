import * as skillService from '../../src/services/skill.service';
import * as skillDao from '../../src/daos/skill.dao';
import { Skill } from '../../src/models/Skill';


jest.mock('../../src/daos/skill.dao');

const mockSkillDao = skillDao as any;

describe('saveSkill', () => {
    test('422 returned if no skillLevel provided', async () => {
        expect.assertions(1);

        mockSkillDao.saveSkill
            .mockImplementation(() => ({}));

        const payload = {
            technology: 'React',
        }

        try {
            await skillService.saveSkill(payload);
            fail('skillService.saveSkill did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no technology is provided', async () => {
        expect.assertions(1);
        mockSkillDao.saveSkill
            .mockImplementation(() => ({}));

        const payload = {
            skillLevel: 'Master'
        }

        try {
            await skillService.saveSkill(payload);
            fail('skillService.saveSkill did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Skill object', async () => {
        expect.assertions(2);

        mockSkillDao.saveSkill
            .mockImplementation(o => o);

        const payload = {
            skillLevel: 'Master',
            technology: 'React'
        };

        const result = await skillService.saveSkill(payload);

        expect(payload).not.toBeInstanceOf(Skill);
        expect(result).toBeInstanceOf(Skill);
    });

    test('ID value of input is replaced in output', async () => {
        expect.assertions(1);

        mockSkillDao.saveSkill
            .mockImplementation(o => o);

        const payload = {
            id: 15,
            skillLevel: 'Master',
            technology: 'React'
        };

        const result = await skillService.saveSkill(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        expect.assertions(1);

        mockSkillDao.saveSkill
            .mockImplementation(o => o);

        const payload = {
            skillLevel: 'Master',
            technology: 'React',
            foofoo: true
        };

        const result = await skillService.saveSkill(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});


describe('patchSkill', () => {
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockSkillDao.patchSkill
            .mockImplementation(() => ({}));

        const payload = {
            id: 1,
            skillLevel: 'Master',
            technology: 'React'
        };

        const result = await skillService.patchSkill(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockSkillDao.patchSkill
            .mockImplementation(() => ({}));

        const payload = {
            skillLevel: 'Master',
            technology: 'React'
        };

        try {
            await skillService.patchSkill(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});