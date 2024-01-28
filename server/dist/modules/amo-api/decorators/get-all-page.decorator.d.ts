import { AmoEntityType } from '../types/amo-api.types';
export type FilterItem = {
    key: string;
    fieldId: number;
    value: string | number | boolean;
};
export type InitialRequestParams = {
    page: number;
    limit: number;
};
export type RequestParamsPipelineDeals = InitialRequestParams & {
    statuses: number[];
    pipelineId: number;
};
export type RequestParams = {
    limit?: number;
    page?: number;
    'filter[entity_id]'?: number | number[];
    userId?: number;
    'filter[entity_type]'?: AmoEntityType;
    with?: AmoEntityType;
};
export declare function GetAllPage(_target: object, _propertyName: string, propertyDescriptor: PropertyDescriptor): void;
