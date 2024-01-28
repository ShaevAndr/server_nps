"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationError = exports.IS_NOT_EMPTY_FIELD = void 0;
exports.IS_NOT_EMPTY_FIELD = 'isNotEmpty';
function createValidationError(errors) {
    return errors
        .map((error) => {
        if (error.children && error.children.length) {
            return createValidationError(error.children);
        }
        return Object.keys(error.constraints).map((validationRequest) => {
            const message = validationRequest === exports.IS_NOT_EMPTY_FIELD ? `${error.property} required` : error.constraints[validationRequest];
            return {
                field_name: error.property,
                message: message,
            };
        });
    })
        .flat();
}
exports.createValidationError = createValidationError;
//# sourceMappingURL=create-validation-error.js.map