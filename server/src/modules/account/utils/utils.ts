import { PaidStatus } from "types/paidStatus";
import { AccountDocument } from "../models/account.models";

export const getSubdomainFromRef = (referer: string): string => {
    const [accountSubdomain] = referer.split('.');
    return accountSubdomain
}

export const getStatus = (account: AccountDocument): PaidStatus => {
    const paidStatus: PaidStatus = { paidStatus: 'notPaid' }
    if (account.isPaid) {
        paidStatus.paidStatus = 'paid'
    }
    if (account.isTestPeriod) {
        paidStatus.paidStatus = 'testPeriod'
    }
    return paidStatus
}
