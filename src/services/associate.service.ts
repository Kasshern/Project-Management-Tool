import { Associate } from '../models/Associate';
import * as associateDao from '../daos/associate.dao';
import { AssociateSkill } from '../models/AssociateSkills';
import { Skill } from '../models/Skill';


export function getAllAssociates(): Promise<Associate[]> {
    return associateDao.getAllAssociates();
}

export function getAssociateById(id: number): Promise<Associate> {
    return associateDao.getAssociateById(id);
}

export function getSkillsByAssociateId(id: number): Promise<Skill[]> {
    return associateDao.getSkillsByAssociateId(id);
}

export function saveAssociate(associate: any): Promise<Associate> {
    const newAssociate = new Associate(
        undefined,
        associate.firstName,
        associate.lastName,
        new Date(associate.birthdate)
    );

    // Validate new associate properties
    if ( associate.firstName && associate.lastName && associate.birthdate) {
        return associateDao.saveAssociate(newAssociate);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function saveAssociateSkill(associateSkill: any): Promise<AssociateSkill> {
    const newAssociateSkill = new AssociateSkill(
        associateSkill.associateId,
        associateSkill.skillId
    );

        // Validate new team assignment properties
    if (associateSkill.associateId && associateSkill.skillId) {
        return associateDao.saveAssociateSkill(newAssociateSkill);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchAssociate(input: any): Promise<Associate> {
    // Guard Operator
const birthdate = input.birthdate && new Date(input.birthdate);

const associate = new Associate(
    input.id,
    input.firstName,
    input.lastName,
    birthdate
);

// Check new associate for valid id
if (!associate.id) {
    throw new Error ('400');
}

return associateDao.patchAssociate(associate);
}

export function deleteAssociate(id: number): Promise<Associate> {
    return associateDao.deleteAssociate(id);
}

export function deleteAssociateSkill(id1: number, id2: number): Promise<AssociateSkill> {
    return associateDao.deleteAssociateSkill(id1, id2);
}