import { CustomFieldsType } from "modules/custom-fields/core/custom-field.entities";
import { Types } from "mongoose";
import { DefaultEntity } from "types/default.entity";
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
