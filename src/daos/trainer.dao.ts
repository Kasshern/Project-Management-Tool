import { db } from '../daos/db';
import { Trainer, TrainerRow } from '../models/Trainer';

export function getAllTrainers(): Promise<Trainer[]> {
    const sql = 'SELECT * FROM trainers';
    return db.query<TrainerRow>(sql, []).then(result => {
        const rows: TrainerRow[] = result.rows;
        // tslint:disable-next-line: no-console
        console.log(rows);
        const trainers: Trainer[] = rows.map(row => Trainer.from(row));
        return trainers;
    });
}

export function getTrainerById(id: number): Promise<Trainer> {
    const sql = 'SELECT * FROM trainers WHERE id = $1';

    return db.query<TrainerRow>(sql, [id])
        .then(result => result.rows.map(row => Trainer.from(row))[0]);
}

export function saveTrainer(trainer: Trainer): Promise<Trainer> {
    const sql = `INSERT INTO trainers (first_name, last_name, birthdate) \
VALUES ($1, $2, $3) RETURNING *`;

    return db.query<TrainerRow>(sql, [
        trainer.firstName,
        trainer.lastName,
        trainer.birthdate.toISOString()
    ]).then(result => result.rows.map(row => Trainer.from(row))[0]);
}

export function patchTrainer(trainer: Trainer): Promise<Trainer> {
    const sql = `UPDATE people SET first_name = COALESCE($1, first_name), \
last_name = COALESCE($2, last_name), birthdate = COALESCE($3, birthdate) \
WHERE id = $4 RETURNING *`;

    const birthdate = trainer.birthdate && trainer.birthdate.toISOString();

    const params = [trainer.firstName, trainer.lastName,
                    birthdate, trainer.id];

    return db.query<TrainerRow>(sql, params)
        .then(result => result.rows.map(row => Trainer.from(row))[0]);
}

export function deleteTrainer(id: number): Promise<Trainer> {
    const sql = `DELETE FROM trainers WHERE id = $1 RETURNING *`;

    return db.query<TrainerRow>(sql, [id])
       .then(result => result.rows.map(row => Trainer.from(row))[0]);
}