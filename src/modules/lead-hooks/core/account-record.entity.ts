import { Types } from "mongoose"

export class AccountRecord {
    account_id: number
    subdomain: string
    leads: Types.ObjectId[]
}