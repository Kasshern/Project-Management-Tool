import { Skill } from '../models/Skill';
import * as skillDao from '../daos/skill.dao';


export function getAllSkills(): Promise<Skill[]> {
    return skillDao.getAllSkills();
}

export function getSkillById(id: number): Promise<Skill> {
    return skillDao.getSkillById(id);
}

export function saveSkill(skill: any): Promise<Skill> {
    const newSkill = new Skill(
        undefined,
        skill.skillLevel,
        skill.technology
    );

    // Validate new skill properties
    if (skill.skillLevel && skill.technology) {
        return skillDao.saveSkill(newSkill);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchSkill(input: any): Promise<Skill> {

const skill = new Skill(
    input.id,
    input.skillLevel,
    input.technology
);

// Check that new skill is a valid id
if (!skill.id) {
    throw new Error ('400');
}

return skillDao.patchSkill(skill);
}

export function deleteSkill(id: number): Promise<Skill> {
        return skillDao.deleteSkill(id);
}
