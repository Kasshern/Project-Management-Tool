/* istanbul ignore file */
import { db } from '../daos/db';
import { Associate, AssociateRow } from '../models/Associate';
import { AssociateSkill, AssociateSkillRow } from '../models/AssociateSkills';
import { Skill, SkillRow } from '../models/Skill';


/**
 * Doc Notes
 */
export async function getAllAssociates(): Promise<Associate[]> {
    const sql = 'SELECT * FROM associates';
    const result = await db.query<AssociateRow>(sql, []);
    return result.rows.map(Associate.from);
}

export async function getAssociateById(id: number): Promise<Associate> {
    const sql = 'SELECT * FROM associates WHERE id = $1';

    const result = await db.query<AssociateRow>(sql, [id]);
    return result.rows.map(Associate.from)[0];
}

export async function getSkillsByAssociateId(id: number): Promise<Skill[]> {
    const sql = 'SELECT skills.* FROM associates \
    LEFT JOIN associate_skills ON associates.id = associate_skills.associate_id \
    INNER JOIN skills ON associate_skills.skill_id = skills.id WHERE associates.id = $1';

    const result = await db.query<SkillRow>(sql, [id]);
        return result.rows.map(Skill.from);
}


export async function saveAssociate(associate: Associate): Promise<Associate> {
    const sql = `INSERT INTO associates (first_name, last_name, birthdate) \
                VALUES ($1, $2, $3) RETURNING *`;

    const result = await db.query<AssociateRow>(sql, [
        associate.firstName,
        associate.lastName,
        associate.birthdate.toISOString()
    ]);

    return result.rows.map(Associate.from)[0];
    }

    export async function saveAssociateSkill(associateSkill: AssociateSkill): Promise<AssociateSkill> {
        const sql = `INSERT INTO associate_skills (associate_id, skill_id) \
        VALUES ($1, $2) RETURNING *`;
    
        const result = await db.query<AssociateSkillRow>(sql, [
            associateSkill.associateId,
            associateSkill.skillId
        ]);
    
        return result.rows.map(AssociateSkill.from)[0];
    }

export async function patchAssociate(associate: Associate): Promise<Associate> {
    const sql = `UPDATE associates SET first_name = COALESCE($1, first_name), \
    last_name = COALESCE($2, last_name), birthdate = COALESCE($3, birthdate) \
    WHERE id = $4 RETURNING *`;

    const birthdate = associate.birthdate && associate.birthdate.toISOString();

    const result = await db.query<AssociateRow>(sql, [
        associate.firstName,
        associate.lastName,
        birthdate,
        associate.id
    ]);

    return result.rows.map(Associate.from)[0];
}

export async function deleteAssociate(id: number): Promise<Associate> {
    const sql = `DELETE FROM associates WHERE id = $1 RETURNING * `;

    const result = await db.query<AssociateRow>(sql, [id]);
    return result.rows.map(Associate.from)[0];
}

export async function deleteAssociateSkill(id1: number, id2: number): Promise<AssociateSkill> {
    const sql = `DELETE FROM associate_skills WHERE associate_id = $1 and skill_id = $2 RETURNING *`;

    const result = await db.query<AssociateSkillRow>(sql, [id1, id2]);
    return result.rows.map(AssociateSkill.from)[0];
}