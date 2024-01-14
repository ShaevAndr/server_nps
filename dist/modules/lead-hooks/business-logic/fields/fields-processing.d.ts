import { Logger } from "core/logger/logger.service";
import { CustomField as CustomField } from "modules/amo-api/types/amo-api.types";
import { CustomFieldDocument } from '../../models/custom-fields.model';
import { CustomFieldDto } from "modules/lead-hooks/dtos/custom-fields.dto";
import { CustomFieldsRepository } from "modules/lead-hooks/repositiries/custom-fields.repository";
import { ConvertedCustomFields } from "modules/lead-hooks/core/lead.entity";
export declare class FieldsProcessing {
    private logger;
    private customFieldsRepository;
    constructor(logger: Logger, customFieldsRepository: CustomFieldsRepository);
    convertCustomFields(accountId: number, custom_fields: CustomField[]): Promise<ConvertedCustomFields>;
    updateOrCreate(field: CustomFieldDto): Promise<CustomFieldDocument>;
    getField(accountId: number, fieldId: number): Promise<CustomFieldDocument>;
}
