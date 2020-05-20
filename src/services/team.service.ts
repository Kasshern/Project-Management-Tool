import { Team } from '../models/Team';
import * as teamDao from '../daos/team.dao';
import { TeamAssignment } from '../models/TeamAssignment';
import { Associate } from '../models/Associate';


export function getAllTeams(): Promise<Team[]> {
    return teamDao.getAllTeams();
}

export function getTeamById(id: number): Promise<Team> {
    return teamDao.getTeamById(id);
}

export function getAllTeamAssignments(): Promise<TeamAssignment[]> {
    return teamDao.getAllTeamAssignments();
}

export function getAssociatesByTeamId(id: number): Promise<Associate[]> {
    return teamDao.getAssociatesByTeamId(id);
}

export function saveTeam(team: any): Promise<Team> {
    const newTeam = new Team(
        undefined,
        team.projectId,
        team.teamName,
        team.techFocus,
        team.maxPeople
    );

        // Validate new team properties
    if (team.projectId && team.teamName && team.techFocus && team.maxPeople ) {
        return teamDao.saveTeam(newTeam);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function saveTeamAssignment(teamAssignment: any): Promise<TeamAssignment> {
    const newTeamAssignment = new TeamAssignment(
        teamAssignment.teamId,
        teamAssignment.associateId
    );

        // Validate new team assignment properties
    if (teamAssignment.teamId && teamAssignment.associateId) {
        return teamDao.saveTeamAssignment(newTeamAssignment);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchTeam(input: any): Promise<Team> {

const team = new Team(
    input.id, input.projectId, input.teamName,
    input.techFocus, input.maxPeople
);

// Check that new team has a valid id
if (!team.id) {
    throw new Error ('400');
}

return teamDao.patchTeam(team);
}

export function deleteTeam(id: number): Promise<Team> {
    return teamDao.deleteTeam(id);
}

export function deleteTeamAssignment(id1: number, id2: number): Promise<TeamAssignment> {
    return teamDao.deleteTeamAssignment(id1, id2);
}