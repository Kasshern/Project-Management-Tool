import { Associate } from '../models/Associate';
import * as associateDao from '../daos/associate.dao';


export function getAllAssociates(): Promise<Associate[]> {
    return associateDao.getAllAssociates();
}

export function getAssociateById(id: number): Promise<Associate> {
    return associateDao.getAssociateById(id);
}

export function saveAssociate(associate: any): Promise<Associate> {
    const newAssociate = new Associate(
        undefined, associate.trainerId,associate.teamId,
         associate.firstName, associate.lastName,
         new Date(associate.birthdate)
    );

    // Validate new associate properties
    if (associate.trainerId && associate.teamId && associate.firstName
        && associate.lastName && associate.birthdate) {
        return associateDao.saveAssociate(newAssociate);
    } else {
        console.warn('Invalid Associate');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchAssociate(input: any): Promise<Associate> {
    // Guard Operator
const birthdate = input.birthdate && new Date(input.birthdate);

const associate = new Associate(
    input.id, input.trainerId, input.teamId,
     input.firstName, input.lastName, birthdate
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