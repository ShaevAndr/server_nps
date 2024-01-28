import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ResponsibleDocument = HydratedDocument<Responsible>;

@Schema()
export class Responsible extends Document {
    @Prop({ required: true })
    public account_id: number;

    @Prop({ required: true })
    public id: number;

    @Prop({ required: true })
    public name: string;
}
export const ResponsibleSchema = SchemaFactory.createForClass(Responsible);
