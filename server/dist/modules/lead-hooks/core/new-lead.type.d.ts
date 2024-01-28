export type NewLead = {
    add: Lead[];
};
export type Lead = {
    id: number;
    name: string;
    status_id: string;
    price: string;
    responsible_user_id: string;
    last_modified: string;
    modified_user_id: string;
    created_user_id: string;
    date_create: string;
    pipeline_id: string;
    account_id: number;
    custom_fields: CustomField[];
    created_at: string;
    updated_at: string;
};
export type CustomField = {
    id: number;
    name: string;
    values: Value[];
};
export type Value = {
    value: string | number;
    enum: string;
};
