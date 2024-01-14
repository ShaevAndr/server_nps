import { Types } from "mongoose";
export declare class AccountRecord {
    account_id: number;
    subdomain: string;
    leads: Types.ObjectId[];
}
