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
import { HydratedDocument, Types, Document } from "mongoose";
export type AccountLeadsDocument = HydratedDocument<AccountLeads>;
export declare class AccountLeads extends Document {
    subdomain: string;
    account_id: number;
    leads: Types.ObjectId[];
}
export declare const AccountLeadsSchema: import("mongoose").Schema<AccountLeads, import("mongoose").Model<AccountLeads, any, any, any, Document<unknown, any, AccountLeads> & AccountLeads & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AccountLeads, Document<unknown, {}, import("mongoose").FlatRecord<AccountLeads>> & import("mongoose").FlatRecord<AccountLeads> & {
    _id: Types.ObjectId;
}>;
