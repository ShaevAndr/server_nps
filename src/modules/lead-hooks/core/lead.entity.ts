import { Types } from "mongoose";
import { DefaultEntity } from "./default.entity";

export type CustomFieldsType = {
    custom_field: Types.ObjectId,
    values: string[]
}
export type ConvertedCustomFields = {
    custom_field: CustomFieldsType[],
    NPS: number
}

export class Lead extends DefaultEntity {

    public responsible_id: Types.ObjectId;

    public company_id: Types.ObjectId[] = [];

    public contact_id: Types.ObjectId;

    public pipeline: string;

    public score: number | null;

    public created_at: number;

    public closed_at: number | null;

    public updated_at: number;

    public fields: CustomFieldsType[] = []

    public NPS: number
}