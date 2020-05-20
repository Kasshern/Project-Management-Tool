/* istanbul ignore file */
import { db } from '../daos/db';
import { Trainer, TrainerRow } from '../models/Trainer';
import { Batch, BatchRow } from '../models/Batch';
import { Project, ProjectRow } from '../models/Project';
import { Team, TeamRow} from '../models/Team';
import { Associate, AssociateRow } from '../models/Associate';

/**
 * Doc Notes
 */

export async function getAllTrainers(): Promise<Trainer[]> {
    const sql = 'SELECT * FROM trainers';

    const result = await db.query<TrainerRow>(sql, []);
    return result.rows.map(Trainer.from);
    }

export async function getTrainerById(id: number): Promise<Trainer> {
    const sql = 'SELECT * FROM trainers WHERE id = $1';

    const result = await db.query<TrainerRow>(sql, [id]);
        return result.rows.map(Trainer.from)[0];
}

export async function getBatchesByTrainerId(id: number): Promise<Batch[]> {
    const userExists: boolean = await trainerExists(id);
    if (!userExists) {
        return undefined;
    }

    const sql = 'SELECT batches.* FROM trainers \
	LEFT JOIN batches ON trainers.id = batches.trainer_id WHERE trainers.id = $1';

    const result = await db.query<BatchRow>(sql, [id]);
        return result.rows.map(Batch.from);
}

export async function getProjectsByTrainerId(id: number): Promise<Project[]> {
    const userExists: boolean = await trainerExists(id);
    if (!userExists) {
        return undefined;
    }

    const sql = 'SELECT projects.* FROM trainers \
    LEFT JOIN batches ON trainers.id = batches.trainer_id \
    INNER JOIN projects ON batches.id = projects.batch_id WHERE trainers.id = $1';

    const result = await db.query<ProjectRow>(sql, [id]);
        return result.rows.map(Project.from);
}

export async function getAssociatesByTrainerId(id: number): Promise<Associate[]> {
    const userExists: boolean = await trainerExists(id);
    if (!userExists) {
        return undefined;
    }

    const sql = 'SELECT DISTINCT associates.* FROM trainers \
    LEFT JOIN batches ON trainers.id = batches.trainer_id \
    LEFT JOIN projects ON batches.id = projects.batch_id \
    LEFT JOIN teams ON projects.id = teams.project_id \
    LEFT JOIN team_assignments ON teams.id = team_assignments.team_id \
    INNER JOIN associates ON team_assignments.associate_id = associates.id WHERE trainers.id = $1';

    const result = await db.query<AssociateRow>(sql, [id]);
        return result.rows.map(Associate.from);
}

export async function getTeamsByTrainerId(id1: number, id2: number): Promise<Team[]> {
    const userExists: boolean = await trainerExists(id1);
    if (!userExists) {
        return undefined;
    }
    
    const sql = 'SELECT teams.* FROM trainers \
    LEFT JOIN batches ON trainers.id = batches.trainer_id \
    LEFT JOIN projects ON batches.id = projects.batch_id \
    INNER JOIN teams ON projects.id = teams.project_id WHERE trainers.id = $1 AND projects.id = $2';

    const result = await db.query<TeamRow>(sql, [id1, id2]);
        return result.rows.map(Team.from);
}

export async function saveTrainer(trainer: Trainer): Promise<Trainer> {
    const sql = `INSERT INTO trainers (first_name, last_name, birthdate) \
VALUES ($1, $2, $3) RETURNING *`;

    const result = await db.query<TrainerRow>(sql, [
        trainer.firstName,
        trainer.lastName,
        trainer.birthdate.toISOString()
    ]);

    return result.rows.map(Trainer.from)[0];
}

export async function patchTrainer(trainer: Trainer): Promise<Trainer> {
    const sql = `UPDATE trainers SET first_name = COALESCE($1, first_name), \
last_name = COALESCE($2, last_name), birthdate = COALESCE($3, birthdate) \
WHERE id = $4 RETURNING *`;

    const birthdate = trainer.birthdate && trainer.birthdate.toISOString();

    const result = await db.query<TrainerRow>(sql, [
        trainer.firstName,
        trainer.lastName,
        birthdate,
        trainer.id

    ]);
    return result.rows.map(Trainer.from)[0];
}

export async function deleteTrainer(id: number): Promise<Trainer> {

    const sql = `DELETE FROM trainers WHERE id = $1 RETURNING *`;
    const result = await db.query<TrainerRow>(sql, [id]);

    return result.rows.map(Trainer.from)[0];
}

export async function trainerExists(id: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT id FROM trainers WHERE id = $1);`;
    const result = await db.query<Exists>(sql, [id]);
    return result.rows[0].exists;
}

interface Exists {
    exists: boolean;
}