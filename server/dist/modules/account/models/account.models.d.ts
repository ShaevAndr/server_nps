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
export type AccountDocument = HydratedDocument<Account>;
export declare class Account extends Document {
    accountId: number;
    accessToken: string;
    refreshToken: string;
    subdomain: string;
    installed: boolean;
    startUsingDate: string;
    finishUsingTime: string;
    isTestPeriod: boolean;
    isPaid: boolean;
    isActive: boolean;
}
export declare const AccountSchema: import("mongoose").Schema<Account, import("mongoose").Model<Account, any, any, any, Document<unknown, any, Account> & Account & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Account, Document<unknown, {}, import("mongoose").FlatRecord<Account>> & import("mongoose").FlatRecord<Account> & {
    _id: import("mongoose").Types.ObjectId;
}>;
