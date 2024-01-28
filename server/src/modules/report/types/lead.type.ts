export type leadInBase = {
    id: number;
    responsible_id: Entity;
    name: string;
    company_id: Entity[];
    contact_id: Entity;
    pipeline: string;
    score: null;
    created_at: number;
    closed_at: null;
    updated_at: number;
    fields: Field[];
    _id: string;
    NPS: number;
}

export type Entity = {
    _id: string;
    account_id: number;
    id: number;
    __v: number;
    name: string;
    type?: string;
}

export interface Field {
    custom_field: Entity;
    values: string[];
    _id: string;
}
