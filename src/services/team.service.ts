import { Team } from '../models/Team';
import * as teamDao from '../daos/team.dao';


export function getAllTeams(): Promise<Team[]> {
    return teamDao.getAllTeams();
}

export function getTeamById(id: number): Promise<Team> {
    return teamDao.getTeamById(id);
}

export function saveTeam(team: any): Promise<Team> {
    const newTeam = new Team(
        undefined, team.projectId, team.teamName,
         team.techFocus, team.maxPeople,
         team.numberOfPeople
    );

        // Validate new team properties
    if (team.teamName && team.techFocus && team.maxPeople && team.numberOfPeople) {
        return teamDao.saveTeam(newTeam);
    } else {
        console.warn('Invalid Associate');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchTeam(input: any): Promise<Team> {
// const birthdate = input.birthdate && new Date(input.birthdate);

const team = new Team(
    input.id, input.projectId, input.teamName,
     input.techFocus, input.maxPeople, input.numberOfPeople
);

// Check that team already exists
if (!team.id) {
    throw new Error ('400');
}

return teamDao.patchTeam(team);
}

export function deleteTeam(id: number): Promise<Team> {
    return teamDao.deleteTeam(id);
}