/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';
export type ReportSettingsDocument = HydratedDocument<ReportSettings>;
export declare class ReportSettings extends Document {
    name: string;
    account_id: number;
    subdomain: string;
    Leads: string;
    Responsible: string;
    ProductGroup: string;
    EvaluationDate: string;
    Nps: string;
    Comment: string;
}
export declare const ReportSettingsSchema: import("mongoose").Schema<ReportSettings, import("mongoose").Model<ReportSettings, any, any, any, Document<unknown, any, ReportSettings> & ReportSettings & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ReportSettings, Document<unknown, {}, import("mongoose").FlatRecord<ReportSettings>> & import("mongoose").FlatRecord<ReportSettings> & {
    _id: import("mongoose").Types.ObjectId;
}>;
