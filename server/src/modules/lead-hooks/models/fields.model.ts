import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Document } from 'mongoose';


export type FieldsDocument = HydratedDocument<Fields>;
@Schema()
export class Fields extends Document {
    @Prop({ required: true, type: Types.ObjectId, ref: 'CustomField' })
    public custom_field: Types.ObjectId;

    @Prop()
    public values: string[];
}
export const FieldsShema = SchemaFactory.createForClass(Fields);
