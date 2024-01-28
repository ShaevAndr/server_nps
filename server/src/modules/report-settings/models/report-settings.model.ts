import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportSettingsDocument = HydratedDocument<ReportSettings>;

@Schema({ timestamps: true })
export class ReportSettings extends Document {
    @Prop({ required: true })
    public name: string;

    @Prop({ required: true })
    public account_id: number;

    @Prop({ required: true })
    public subdomain: string;

    @Prop({ required: true })
    public Leads: string;

    @Prop({ required: true })
    public Responsible: string;

    @Prop({ required: true })
    public ProductGroup: string;

    @Prop({ required: true })
    public EvaluationDate: string;

    @Prop({ required: true })
    public Nps: string;

    @Prop({ required: true })
    public Comment: string;
}

export const ReportSettingsSchema = SchemaFactory.createForClass(ReportSettings);