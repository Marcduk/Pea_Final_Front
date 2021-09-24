import { Catalogue } from './../app/catalogue';

import { Pea } from "./pea";

export interface LearningResult {
    id?: number;
    pea?:Pea;
    parent?: string;
    type?: Catalogue;
    //parent?: LearningResult;    
    code?:string;
    description?:string;    
    children?: LearningResult[];

    
    created_at?:string;
    updated_at?:string;
    deleted_at?:null;
}
