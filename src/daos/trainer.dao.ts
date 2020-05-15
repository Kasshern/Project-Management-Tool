import { db } from '../daos/db';
import { Trainer } from '../models/Trainer';

/**
 * Doc Notes
 *
 */
export async function getAllTrainers(): Promise<Trainer[]> {
    const sql = 'SELECT * FROM trainers';

    const result = await db.query<Trainer>(sql, []);
    return result.rows;
    }

export async function getTrainerById(id: number): Promise<Trainer> {
    const sql = 'SELECT * FROM trainers WHERE id = $1';

    const result = await db.query<Trainer>(sql, [id]);
        return result.rows[0];
}

export async function saveTrainer(trainer: Trainer): Promise<Trainer> {
    const sql = `INSERT INTO trainers (first_name, last_name, birthdate) \
VALUES ($1, $2, $3) RETURNING *`;

    const result = await db.query<Trainer>(sql, [
        trainer.firstName,
        trainer.lastName,
        trainer.birthdate.toISOString()
    ]);
    return result.rows[0];
}

export async function patchTrainer(trainer: Trainer): Promise<Trainer> {
    const sql = `UPDATE trainers SET first_name = COALESCE($1, first_name), \
last_name = COALESCE($2, last_name), birthdate = COALESCE($3, birthdate) \
WHERE id = $4 RETURNING *`;

    const birthdate = trainer.birthdate && trainer.birthdate.toISOString();

    const result = await db.query<Trainer>(sql, [
        trainer.firstName,
        trainer.lastName,
        birthdate,
        trainer.id
    ]);
    return result.rows[0];
}

export async function deleteTrainer(id: number): Promise<Trainer> {
    const sql = `DELETE FROM trainers WHERE id = $1 RETURNING *`;

    const result = await db.query<Trainer>(sql, [id]);
    return result.rows[0];
}