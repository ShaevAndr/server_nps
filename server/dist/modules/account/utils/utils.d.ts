import { PaidStatus } from "types/paidStatus";
import { AccountDocument } from "../models/account.models";
export declare const getSubdomainFromRef: (referer: string) => string;
export declare const getStatus: (account: AccountDocument) => PaidStatus;
