import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, Document } from "mongoose";


export type AccountLeadsDocument = HydratedDocument<AccountLeads>;

@Schema()
export class AccountLeads extends Document {
    @Prop({ required: true })
    public subdomain: string;

    @Prop({ required: true })
    public account_id: number;

    @Prop({ required: true, type: [Types.ObjectId], ref: 'Lead' })
    public leads: Types.ObjectId[];
}

export const AccountLeadsSchema = SchemaFactory.createForClass(AccountLeads);