import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company extends Document {
    @Prop({ required: true })
    public id: number;

    @Prop({ required: true })
    public account_id: number;

    @Prop({ required: true })
    public name: string;
}
export const CompanySchema = SchemaFactory.createForClass(Company);




