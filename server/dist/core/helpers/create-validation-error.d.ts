import { ValidationError } from '@nestjs/common';
export type ValidationErrorType = {
    request_id?: number;
    field_name: string;
    message: string;
};
export declare const IS_NOT_EMPTY_FIELD = "isNotEmpty";
export declare function createValidationError(errors: ValidationError[]): ValidationErrorType[];
