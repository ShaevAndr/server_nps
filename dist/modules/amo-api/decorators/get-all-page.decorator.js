"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPage = void 0;
const logger_service_1 = require("../../../core/logger/logger.service");
function GetAllPage(_target, _propertyName, propertyDescriptor) {
    const logger = new logger_service_1.Logger();
    logger.log('GetAllPage decorator init');
    const originalFn = propertyDescriptor.value;
    const defaultParams = {
        limit: 250,
        page: 1,
    };
    async function bulkRequest(accountRequestParams, params = defaultParams) {
        let currentPage = params.page ? params.page : defaultParams.page;
        let isFinalPage = false;
        const response = await originalFn.apply(this, [accountRequestParams, { ...params }]);
        if (!response) {
            isFinalPage = true;
        }
        let result = [...response];
        while (!isFinalPage) {
            currentPage = currentPage + 1;
            const next = await originalFn.apply(this, [accountRequestParams, { ...params, page: currentPage }]);
            if (!next) {
                break;
            }
            result = [...result, ...next];
        }
        ;
        return result;
    }
    propertyDescriptor.value = bulkRequest;
}
exports.GetAllPage = GetAllPage;
//# sourceMappingURL=get-all-page.decorator.js.map