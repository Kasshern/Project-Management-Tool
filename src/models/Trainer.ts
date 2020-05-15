export class Trainer {
    id: number;
    firstName: string;
    lastName: string;
    birthdate: Date;

/**
 *  Static function for creating a Trainer instance based on
 *  the structure within the database
 */


    constructor( id: number, firstName: string, lastName: string, birthdate: Date) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
    }
}


