export class AssociateSkill {
    associateId: number;
    skillId: number;

/**
 *  Static function for creating a Team Assignment instance based on
 *  the structure within the database. This accepts an object of
 *  type defined by the interface TeamAssignmentRow and uses that to 
 *  create an instance of TeamAssignment.
 */

static from(obj: AssociateSkillRow): AssociateSkill {
    const associateSkill = new AssociateSkill(
        obj.associate_id,
        obj.skill_id,
    );
    return associateSkill;
}

    constructor( associateId: number, skillId: number) {
        this.associateId = associateId;
        this.skillId = skillId;
    }
}

export interface AssociateSkillRow {
    associate_id: number;
    skill_id: number;
}