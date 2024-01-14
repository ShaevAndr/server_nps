import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export
    class Contact extends Document {
    @Prop({ required: true })
    public id: number;

    @Prop({ required: true })
    public account_id: number;

    @Prop({ required: true })
    public name: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);