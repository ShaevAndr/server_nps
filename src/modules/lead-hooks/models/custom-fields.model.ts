import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomFieldDocument = HydratedDocument<CustomField>;

@Schema()
export class CustomField extends Document {
    @Prop({ required: true })
    public id: number;

    @Prop({ required: true })
    public account_id: number;

    @Prop({ required: true })
    public name: string;

    @Prop({ required: true })
    public type: string;
}
export const CustomFieldShema = SchemaFactory.createForClass(CustomField);

