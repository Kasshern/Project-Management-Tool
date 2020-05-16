export class Project {
    id: number;
    batchId: number;
    projectName: string;
    goal: string;
    maxTeams: number;
    // numberOfTeams: number;
/**
 *  Static function for creating a Project instance based on 
 *  the structure within the database
 */
/*
    static from(obj: ProjectRow): Project {
        const project = new Project(
            obj.id, obj.project_name, obj.goal, obj. max_teams
        );
        return project;
    }
*/

    constructor( id: number, batchId: number, projectName: string, goal: string, maxTeams: number) {
        this.id = id;
        this.batchId = batchId;
        this.projectName = projectName;
        this.goal = goal;
        this.maxTeams = maxTeams;
    }
}

/*
export interface ProjectRow {
    id: number;
    project_name: string;
    goal: string;
    max_teams: number;
}
*/