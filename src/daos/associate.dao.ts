import { db } from '../daos/db';
import { Associate } from '../models/Associate';

/**
 *
 *
 */
export async function getAllAssociates(): Promise<Associate[]> {
    const sql = 'SELECT * FROM associates';
    const result = await db.query<Associate>(sql, []);
    return result.rows;
}

export async function getAssociateById(id: number): Promise<Associate> {
    const sql = 'SELECT * FROM associates WHERE id = $1';

    const result = await db.query<Associate>(sql, [id]);
    return result.rows[0];
}

export async function saveAssociate(associate: Associate): Promise<Associate> {
    const sql = `INSERT INTO associates (first_name, last_name, birthdate) \
                VALUES ($1, $2, $3) RETURNING *`;

    const result = await db.query<Associate>(sql, [
        associate.firstName,
        associate.lastName,
        associate.birthdate.toISOString()
    ]);
    return result.rows[0];
    }

export async function patchAssociate(associate: Associate): Promise<Associate> {
    const sql = `UPDATE people SET trainer_id = COALESCE ($1, trainer_id), \
    team_id = COALESCE ($2, team_id), first_name = COALESCE($3, first_name), \
    last_name = COALESCE($4, last_name), birthdate = COALESCE($5, birthdate) \
    WHERE id = $6 RETURNING *`;

    const birthdate = associate.birthdate && associate.birthdate.toISOString();

    const result = await db.query(sql, [
        associate.firstName,
        associate.lastName,
        birthdate,
        associate.id
    ]);

    return result.rows[0];
}

export async function deleteAssociate(id: number): Promise<Associate> {
    const sql = `DELETE FROM associates WHERE id = $1 RETURNING * `;

    const result = await db.query<Associate>(sql, [id]);
    return result.rows[0];
}