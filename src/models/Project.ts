export class Project {
    id: number;
    projectName: string;
    goal: string;
    maxTeams: number;
    numberOfTeams: number;

    static from(obj: ProjectRow): Project {
        const project = new Project(
            obj.id, obj.project_name, obj.goal, obj. max_teams, obj.number_of_teams
        );
        return project;
    }

    constructor( id: number, projectName: string, goal: string, maxTeams: number, numberOfTeams: number) {
        this.id = id;
        this.projectName = projectName;
        this.goal = goal;
        this.maxTeams = maxTeams;
        this.numberOfTeams = numberOfTeams;
    }
}

export interface ProjectRow {
    id: number;
    project_name: string;
    goal: string;
    max_teams: number;
    number_of_teams: number;
}