export class Batch {
    id: number;
    trainerId: number;
    batchName: string;
    startDate: Date;
    durationInDays: string;

/**
 *  Static function for creating a Batch instance based on
 *  the structure within the database
 */

/*
static from(obj: BatchRow): Batch {
    const batch = new Batch(
        obj.id, obj.first_name, obj.last_name, new Date(obj.birthdate)
    );
    return batch;
}
*/

    constructor( id: number, trainerId: number, batchName: string, startDate: Date, durationInDays: string) {
        this.id = id;
        this.trainerId = trainerId;
        this.batchName = batchName;
        this.startDate = startDate;
        this.durationInDays = durationInDays;
    }
}

/*
export interface BatchRow {
    id: number;
    trainer_id: string;
    batch_name: string;
    start_date: Date;
    duration_in_days: string;
    // email: string;
}
*/

