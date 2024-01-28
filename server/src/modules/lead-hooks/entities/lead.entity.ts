import { CustomFieldsType } from "modules/custom-fields/entities/custom-field.entities";
import { Types } from "mongoose";
import { DefaultEntity } from "types/default.entity";


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