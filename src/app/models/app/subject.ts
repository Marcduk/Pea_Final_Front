import { AcademicPeriod } from './academic-period';
export interface Subject {
    id?: number;
    academic_period?:AcademicPeriod;
    description?:string; //nombre de materias
    objective?:string; // codes
    created_at?:string;
    updated_at?:string;
    deleted_at?:null;
    
}