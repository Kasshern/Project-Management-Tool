import { db } from '../daos/db';
import { Associate, AssociateRow } from '../models/Associate';

export function getAllAssociates(): Promise<Associate[]> {
    const sql = 'SELECT * FROM associates';
    return db.query<AssociateRow>(sql, []).then(result => {
        const rows: AssociateRow[] = result.rows;
        console.log(rows);
        const associatess: Associate[] = rows.map(row => Associate.from(row));
        return associatess;
    });
}

export function getAssociateById(id: number): Promise<Associate> {
    const sql = 'SELECT * FROM associates WHERE id = $1';

    return db.query<AssociateRow>(sql, [id])
        .then(result => result.rows.map(row => Associate.from(row))[0]);
}

export function saveAssociate(associate: Associate): Promise<Associate> {
    const sql = `INSERT INTO associates (first_name, last_name, birthdate) \
VALUES ($1, $2, $3) RETURNING *`;

    return db.query<AssociateRow>(sql, [
        associate.firstName,
        associate.lastName,
        associate.birthdate.toISOString()
    ]).then(result => result.rows.map(row => Associate.from(row))[0]);
}

export function patchAssociate(associate: Associate): Promise<Associate> {
    const sql = `UPDATE people SET first_name = COALESCE($1, first_name), \
last_name = COALESCE($2, last_name), birthdate = COALESCE($3, birthdate) \
WHERE id = $4 RETURNING *`;

    const birthdate = associate.birthdate && associate.birthdate.toISOString();

    const params = [associate.firstName, associate.lastName,
                    birthdate, associate.id];

    return db.query<AssociateRow>(sql, params)
        .then(result => result.rows.map(row => Associate.from(row))[0]);
}

export function deleteAssociate(id: number): Promise<Associate> {
    const sql = `DELETE FROM associates WHERE id = $1 RETURNING *`;

    return db.query<AssociateRow>(sql, [id])
       .then(result => result.rows.map(row => Associate.from(row))[0]);
}