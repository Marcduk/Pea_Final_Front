import { Career } from './career';
export interface Mesh {
    id?: number;
    name?: string;
    career?: Career;
    description?:string;
    objective?:string;
    created_at?:string;
    updated_at?:string;
    deleted_at?:string;
    
}
