"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const handleError = (error, message) => {
    if (error instanceof common_1.HttpException) {
        throw error;
    }
    if (message) {
        throw new common_1.HttpException(message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof axios_1.AxiosError) {
        throw new common_1.HttpException(error?.response?.data || error?.response || error, error?.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof Error) {
        throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw new common_1.HttpException('Unexpected error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
};
exports.default = handleError;
//# sourceMappingURL=handleError.js.map