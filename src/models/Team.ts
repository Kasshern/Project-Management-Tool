export class Team {
    id: number;
    projectId: number;
    teamName: string;
    techFocus: string;
    maxPeople: number;
   // numberOfPeople: number;

/**
 *  Static function for creating a Team instance based on 
 *  the structure within the database
 */
/*
    static from(obj: TeamRow): Team {
        const team = new Team(
            obj.id, obj.project_id, obj.team_name, obj.tech_focus, obj. max_people
        );
        return team;
    }
*/
    constructor( id: number, projectId: number, teamName: string, techFocus: string, maxPeople: number) {
        this.id = id;
        this.projectId = projectId;
        this.teamName = teamName;
        this.techFocus = techFocus;
        this.maxPeople = maxPeople;
    }
}
/*
export interface TeamRow {
    id: number;
    project_id: number;
    team_name: string;
    tech_focus: string;
    max_people: number;
}
*/