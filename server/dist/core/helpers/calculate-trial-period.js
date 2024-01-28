"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndOfTrialPeriodDate = exports.getStartUsingDate = void 0;
const dayjs = require("dayjs");
function getStartUsingDate() {
    const now = dayjs();
    return now.format('YYYY-MM-DDTHH:mm:ss');
}
exports.getStartUsingDate = getStartUsingDate;
function getEndOfTrialPeriodDate(start) {
    return start.add(15, 'day').format('YYYY-MM-DDTHH:mm:ss');
}
exports.getEndOfTrialPeriodDate = getEndOfTrialPeriodDate;
//# sourceMappingURL=calculate-trial-period.js.map