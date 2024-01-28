import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Fields, FieldsShema } from './fields.model';


export type LeadDocument = HydratedDocument<Lead>;

@Schema()
export class Lead extends Document {
    @Prop({ required: true })
    public id: number;

    @Prop({ required: true })
    public account_id: number;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Responsible' })
    public responsible_id: Types.ObjectId;

    @Prop({ required: true })
    public name: string;

    @Prop({ type: [Types.ObjectId], ref: 'Company' })
    public company_id: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'Contact' })
    public contact_id: Types.ObjectId;

    @Prop({ required: true })
    public pipeline: string;

    @Prop()
    public score: number;

    @Prop({ required: true })
    public created_at: number;

    @Prop()
    public closed_at: number;

    @Prop()
    public updated_at: number;

    @Prop({ type: [FieldsShema] })
    public fields: Fields[]
}

export const LeadSchema = SchemaFactory.createForClass(Lead)

