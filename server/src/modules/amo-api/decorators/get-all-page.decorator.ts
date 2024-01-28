import { Logger } from 'core/logger/logger.service';
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
    // filters?: FilterItem[];
    // withEntity?: string[];
    'filter[entity_id]'?: number | number[];
    userId?: number;
    'filter[entity_type]'?: AmoEntityType;
    with?: AmoEntityType;
};

export function GetAllPage(_target: object, _propertyName: string, propertyDescriptor: PropertyDescriptor): void {
    const logger = new Logger();
    logger.log('GetAllPage decorator init');
    const originalFn = propertyDescriptor.value;
    const defaultParams = {
        limit: 250,
        page: 1,
    };

    async function bulkRequest<T>(accountRequestParams: unknown, params: RequestParams = defaultParams): Promise<T[]> {
        let currentPage = params.page ? params.page : defaultParams.page;
        let isFinalPage = false
        const response = await originalFn.apply(this, [accountRequestParams, { ...params }]);

        if (!response) {
            isFinalPage = true
        }
        let result = [...response]
        while (!isFinalPage) {
            currentPage = currentPage + 1
            const next = await originalFn.apply(this, [accountRequestParams, { ...params, page: currentPage }]);
            if (!next) {
                break
            }
            result = [...result, ...next]
        };
        return result;
    }

    propertyDescriptor.value = bulkRequest;
}
