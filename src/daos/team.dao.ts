/* istanbul ignore file */
import { db } from '../daos/db';
import { Team, TeamRow } from '../models/Team';
import { TeamAssignment, TeamAssignmentRow } from '../models/teamAssignment';
import { Associate, AssociateRow } from '../models/Associate';

/**
 * Doc Notes
 */
export async function getAllTeams(): Promise<Team[]> {
    const sql = 'SELECT * FROM teams';

    const result = await db.query<TeamRow>(sql, []);
    return result.rows.map(Team.from);
}

export async function getTeamById(id: number): Promise<Team> {
    const sql = 'SELECT * FROM teams WHERE id = $1';

    const result = await db.query<TeamRow>(sql, [id]);
    return result.rows.map(Team.from)[0];
}

export async function getAllTeamAssignments(): Promise<TeamAssignment[]> {
    const sql = 'SELECT * FROM team_assignments';

    const result = await db.query<TeamAssignmentRow>(sql, []);
    return result.rows.map(TeamAssignment.from);
}

export async function getAssociatesByTeamId(id: number): Promise<Associate[]> {
    const doExists: boolean = await teamExists(id);
    if (!doExists) {
        return undefined;
    }

    const sql = 'SELECT associates.* FROM teams \
    LEFT JOIN team_assignments ON teams.id = team_assignments.team_id \
    INNER JOIN associates ON team_assignments.associate_id = associates.id WHERE teams.id = $1';

    const result = await db.query<AssociateRow>(sql, [id]);
        return result.rows.map(Associate.from);
}

export async function saveTeam(team: Team): Promise<Team> {
    const sql = `INSERT INTO teams (project_id, team_name, tech_focus, max_people) \
VALUES ($1, $2, $3, $4) RETURNING *`;

    const result = await db.query<TeamRow>(sql, [
        team.projectId,
        team.teamName,
        team.techFocus,
        team.maxPeople,
    ]);
    return result.rows.map(Team.from)[0];
}

export async function saveTeamAssignment(teamAssignment: TeamAssignment): Promise<TeamAssignment> {
    const sql = `INSERT INTO team_assignments (team_id, associate_id) \
    VALUES ($1, $2) RETURNING *`;

    const result = await db.query<TeamAssignmentRow>(sql, [
        teamAssignment.teamId,
        teamAssignment.associateId
    ]);

    return result.rows.map(TeamAssignment.from)[0];
}

export async function patchTeam(team: Team): Promise<Team> {
    const sql = `UPDATE teams SET project_id = COALESCE ($1, project_id),  \
    team_name = COALESCE($2, team_name), tech_focus = COALESCE($3, tech_focus), \
    max_people = COALESCE($4, max_people) WHERE id = $5 RETURNING *`;

    const result = await db.query<TeamRow>(sql, [
        team.projectId,
        team.teamName,
        team.techFocus,
        team.maxPeople,
        team.id
        ]);

        return result.rows.map(Team.from)[0];
}

export async function deleteTeam(id: number): Promise<Team> {
    const sql = `DELETE FROM teams WHERE id = $1 RETURNING *`;

    const result = await db.query<TeamRow>(sql, [id]);
    return result.rows.map(Team.from)[0];
}

export async function deleteTeamAssignment(id1: number, id2: number): Promise<TeamAssignment> {
    const sql = `DELETE FROM team_assignments WHERE team_id = $1 and associate_id = $2 RETURNING *`;

    const result = await db.query<TeamAssignmentRow>(sql, [id1, id2]);
    return result.rows.map(TeamAssignment.from)[0];
}

export async function teamExists(id: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT id FROM teams WHERE id = $1);`;
    const result = await db.query<Exists>(sql, [id]);
    return result.rows[0].exists;
}

interface Exists {
    exists: boolean;
}