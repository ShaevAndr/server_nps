"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = exports.getSubdomainFromRef = void 0;
const getSubdomainFromRef = (referer) => {
    const [accountSubdomain] = referer.split('.');
    return accountSubdomain;
};
exports.getSubdomainFromRef = getSubdomainFromRef;
const getStatus = (account) => {
    const paidStatus = { paidStatus: 'notPaid' };
    if (account.isPaid) {
        paidStatus.paidStatus = 'paid';
    }
    if (account.isTestPeriod) {
        paidStatus.paidStatus = 'testPeriod';
    }
    return paidStatus;
};
exports.getStatus = getStatus;
//# sourceMappingURL=utils.js.map