export class Trainer {
    id: number;
    firstName: string;
    lastName: string;
    birthdate: Date;

/**
 *  Static function for creating a Trainer instance based on
 *  the structure within the database. This accepts an object of
 *  type defined by the interface TrainerRow and uses that to 
 * create an instance of Trainer.
 */

static from(obj: TrainerRow): Trainer {
    const trainer = new Trainer(
        obj.id,
        obj.first_name,
        obj.last_name,
        new Date(obj.birthdate)
    );
    return trainer;
}

    constructor( id: number, firstName: string, lastName: string, birthdate: Date) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
    }
}

export interface TrainerRow {
    id: number;
    first_name: string;
    last_name: string;
    birthdate: Date;
    // email: string;
}

