import { Mesh, Catalogue, SchoolPeriod, AcademicPeriod } from './models.index';
export interface Subject {
    id?: number;
    name?: string;
    code?: string;
    mesh?: Mesh;
    academic_period?: AcademicPeriod;
    school_period?: SchoolPeriod;
    curricular_unit?: Catalogue;
    formation_field?: Catalogue;
    modality?: Catalogue;
    teaching_hour?: number;
    autonomous_hour?: number;
    practical_hour?: number;
    total_hour?: number;
    description?: string;
    objective?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}