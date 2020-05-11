import { Associate } from '../models/Associate';
import * as associateDao from '../daos/associate.dao';


export function getAllAssociates(): Promise<Associate[]> {
    // Internal logic
    return associateDao.getAllAssociates();
}

export function getAssociateById(id: number): Promise<Associate> {
    // Internal logic
    return associateDao.getAssociateById(id);
}

export function saveAssociate(associate: any): Promise<Associate> {
    // Internal logic
    const newAssociate = new Associate(
        undefined, undefined, undefined,
         associate.firstName, associate.lastName,
         new Date(associate.birthdate)
    );

    if (associate.firstName && associate.lastName && associate.brithdate) {
        return associateDao.saveAssociate(newAssociate);
    } else {
        // tslint:disable-next-line: no-console
        console.warn('Invalid Associate');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchAssociate(input: any): Promise<Associate> {
    // Internal logic
const birthdate = input.birthdate && new Date(input.birthdate);

const associate = new Associate(
    input.id, input.associateId, input.teamId,
     input.firstName, input.lastName, birthdate
);

if (!associate.id) {
    throw new Error ('400');
}

return associateDao.patchAssociate(associate);
}

export function deleteAssociate(id: number): Promise<Associate> {
    return associateDao.deleteAssociate(id);
}