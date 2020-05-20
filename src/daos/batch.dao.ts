/* istanbul ignore file */
import { db } from '../daos/db';
import { Batch, BatchRow } from '../models/Batch';

/**
 * Doc Notes
 */
export async function getAllBatches(): Promise<Batch[]> {
    const sql = 'SELECT * FROM batches';

    const result = await db.query<BatchRow>(sql, []);
    return result.rows.map(Batch.from);
    }

export async function getBatchById(id: number): Promise<Batch> {
    const sql = 'SELECT * FROM batches WHERE id = $1';

    const result = await db.query<BatchRow>(sql, [id]);
    return result.rows.map(Batch.from)[0];
}

export async function saveBatch(batch: Batch): Promise<Batch> {
    const sql = `INSERT INTO batches (trainer_id, batch_name, start_date, duration_in_days) \
VALUES ($1, $2, $3, $4) RETURNING *`;

const startDate = batch.startDate && batch.startDate.toISOString();

    const result = await db.query<BatchRow>(sql, [
        batch.trainerId,
        batch.batchName,
        startDate,
        batch.durationInDays
    ]);
    return result.rows.map(Batch.from)[0];
}

export async function patchBatch(batch: Batch): Promise<Batch> {
    const sql = `UPDATE batches SET trainer_id = COALESCE($1, trainer_id), \
batch_name = COALESCE($2, batch_name), start_date = COALESCE($3, start_date), \
duration_in_days = COALESCE($4, duration_in_days) WHERE id = $5 RETURNING *`;

    const startDate = batch.startDate && batch.startDate.toISOString();

    const result = await db.query<BatchRow>(sql, [
        batch.trainerId,
        batch.batchName,
        startDate,
        batch.durationInDays,
        batch.id
    ]);
    return result.rows.map(Batch.from)[0];
}

export async function deleteBatch(id: number): Promise<Batch> {
    const sql = `DELETE FROM batches WHERE id = $1 RETURNING *`;

    const result = await db.query<BatchRow>(sql, [id]);
    return result.rows.map(Batch.from)[0];
}