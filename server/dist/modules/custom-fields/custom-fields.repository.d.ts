import { CustomField, CustomFieldDocument } from './models/custom-fields.model';
import { Model } from 'mongoose';
import { Logger } from 'core/logger/logger.service';
import { Field } from './core/custom-field.entities';
export declare class CustomFieldsRepository {
    private readonly customFieldsRepository;
    private readonly logger;
    constructor(customFieldsRepository: Model<CustomField>, logger: Logger);
    findOne(accountId: number, fieldId: number): Promise<CustomFieldDocument>;
    addOrUpdate(custom_field: Field): Promise<CustomFieldDocument>;
}
