export class Team {
    id: number;
    projectId: number;
    teamName: string;
    techFocus: string;
    maxPeople: number;
    numberOfPeople: number;

    static from(obj: TeamRow): Team {
        const team = new Team(
            obj.id, obj.project_id, obj.team_name, obj.tech_focus, obj. max_people, obj.number_of_people
        );
        return team;
    }

    constructor( id: number, projectId: number, teamName: string, techFocus: string, maxPeople: number, numberOfPeople: number) {
        this.id = id;
        this.projectId = projectId;
        this.teamName = teamName;
        this.techFocus = techFocus;
        this.maxPeople = maxPeople;
        this.numberOfPeople = numberOfPeople;
    }
}

export interface TeamRow {
    id: number;
    project_id: number;
    team_name: string;
    tech_focus: string;
    max_people: number;
    number_of_people: number;
}