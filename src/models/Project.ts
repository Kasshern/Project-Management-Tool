export class Project {
    id: number;
    batchId: number;
    projectName: string;
    goal: string;
    maxTeams: number;

/**
 *  Static function for creating a Project instance based on
 *  the structure within the database. This accepts an object of
 *  type defined by the interface ProjectRow and uses that to
 * create an instance of Project.
 */

    static from(obj: ProjectRow): Project {
        const project = new Project(
            obj.id,
            obj.batch_id,
            obj.project_name,
            obj.goal,
            obj.max_teams
        );
        return project;
    }

    constructor( id: number, batchId: number, projectName: string, goal: string, maxTeams: number) {
        this.id = id;
        this.batchId = batchId;
        this.projectName = projectName;
        this.goal = goal;
        this.maxTeams = maxTeams;
    }
}

export interface ProjectRow {
    id: number;
    batch_id: number;
    project_name: string;
    goal: string;
    max_teams: number;
}
