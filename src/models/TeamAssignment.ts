export class TeamAssignment {
    teamId: number;
    associateId: number;

/**
 *  Static function for creating a Team Assignment instance based on
 *  the structure within the database. This accepts an object of
 *  type defined by the interface TeamAssignmentRow and uses that to 
 *  create an instance of TeamAssignment.
 */

static from(obj: TeamAssignmentRow): TeamAssignment {
    const teamAssignment = new TeamAssignment(
        obj.team_id,
        obj.associate_id
    );
    return teamAssignment;
}

    constructor( teamId: number, associateId: number) {
        this.teamId = teamId;
        this.associateId = associateId;
    }
}

export interface TeamAssignmentRow {
    team_id: number;
    associate_id: number;
}
