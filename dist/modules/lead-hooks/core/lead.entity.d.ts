import { Types } from "mongoose";
import { DefaultEntity } from "./default.entity";
export type CustomFieldsType = {
    custom_field: Types.ObjectId;
    values: string[];
};
export type ConvertedCustomFields = {
    custom_field: CustomFieldsType[];
    NPS: number;
};
export declare class Lead extends DefaultEntity {
    responsible_id: Types.ObjectId;
    company_id: Types.ObjectId[];
    contact_id: Types.ObjectId;
    pipeline: string;
    score: number | null;
    created_at: number;
    closed_at: number | null;
    updated_at: number;
    fields: CustomFieldsType[];
    NPS: number;
}
