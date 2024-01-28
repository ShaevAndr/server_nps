import { Types } from "mongoose";
import { DefaultEntity } from "../../../types/default.entity"

export class Field extends DefaultEntity {
    type: string;
}

export type CustomFieldsType = {
    custom_field: Types.ObjectId,
    values: string[]
}

export type ConvertedCustomFields = {
    custom_field: CustomFieldsType[],
    NPS: number
}