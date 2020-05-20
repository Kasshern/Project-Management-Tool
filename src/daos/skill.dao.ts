/* istanbul ignore file */
import { db } from '../daos/db';
import { Skill, SkillRow } from '../models/Skill';

/**
 * Doc Notes
 *
 */
export async function getAllSkills(): Promise<Skill[]> {
    const sql = 'SELECT * FROM skills';

    const result = await db.query<SkillRow>(sql, []);
    return result.rows.map(Skill.from);
    }

export async function getSkillById(id: number): Promise<Skill> {
    const sql = 'SELECT * FROM skills WHERE id = $1';

    const result = await db.query<SkillRow>(sql, [id]);
        return result.rows.map(Skill.from)[0];
}

export async function saveSkill(skill: Skill): Promise<Skill> {
    const sql = `INSERT INTO skills (skill_level, technology) \
VALUES ($1, $2) RETURNING *`;

    const result = await db.query<SkillRow>(sql, [
        skill.skillLevel,
        skill.technology
    ]);
    return result.rows.map(Skill.from)[0];
}

export async function patchSkill(skill: Skill): Promise<Skill> {
    const sql = `UPDATE skills SET skill_level = COALESCE($1, skill_level), \
technology = COALESCE($2, technology) WHERE id = $3 RETURNING *`;

    const result = await db.query<SkillRow>(sql, [
        skill.skillLevel,
        skill.technology,
        skill.id
    ]);
    return result.rows.map(Skill.from)[0];
}

export async function deleteSkill(id: number): Promise<Skill> {
    const sql = `DELETE FROM skills WHERE id = $1 RETURNING *`;

    const result = await db.query<SkillRow>(sql, [id]);
    return result.rows.map(Skill.from)[0];
}