import { Pea } from './pea';

export interface Unit {
    id?: number;
    pea?:Pea;
    description?:string;
    order?:number;
    name?:string;
    created_at?:string;
    updated_at?:string;
    deleted_at?:null;
}