import {Status} from './status';

export interface SchoolPeriod {
    id?: number;
    status?: Status;
    code?: string; //trae datos
    name?: string;
    start_date?: Date;
    end_date?: Date;
}
