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
export type CustomFieldDocument = HydratedDocument<CustomField>;
export declare class CustomField extends Document {
    id: number;
    account_id: number;
    name: string;
    type: string;
}
export declare const CustomFieldShema: import("mongoose").Schema<CustomField, import("mongoose").Model<CustomField, any, any, any, Document<unknown, any, CustomField> & CustomField & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CustomField, Document<unknown, {}, import("mongoose").FlatRecord<CustomField>> & import("mongoose").FlatRecord<CustomField> & {
    _id: import("mongoose").Types.ObjectId;
}>;
