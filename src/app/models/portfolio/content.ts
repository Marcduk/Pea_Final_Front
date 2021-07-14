import { Unit } from './unit';

export interface Content {
    id?: number;
    unit?: Unit;
    week?:number;
    contents?:string[];
    teaching_hours?:number;
    teaching_activities?:string[];
    practical_hours?:number;
    practical_activities?:string[];
    autonomous_hours?:number;
    autonomous_activities?:string[];
    observations?:string[]; 
    deleted_at?:null;   
    created_at?:string;
    updated_at?:string;    
}