import { Injectable } from "@nestjs/common";
import { Logger } from "core/logger/logger.service";
import { CustomField as CustomField } from "modules/amo-api/types/amo-api.types";
import { CustomFieldDocument } from '../../models/custom-fields.model'
import { CustomFieldDto } from "modules/lead-hooks/dtos/custom-fields.dto";
import { CustomFieldsRepository } from "modules/lead-hooks/repositiries/custom-fields.repository";
import { fieldFactory } from "modules/lead-hooks/utils/factory";
import { ConvertedCustomFields, CustomFieldsType } from "modules/lead-hooks/core/lead.entity";
import { NPSField } from "core/constants/app.constants";

@Injectable()
export class FieldsProcessing {
    constructor(
        private logger: Logger,
        private customFieldsRepository: CustomFieldsRepository
    ) { }

    async convertCustomFields(accountId: number, custom_fields: CustomField[]): Promise<ConvertedCustomFields> {
        const loggerContext = `${FieldsProcessing.name}/${this.convertCustomFields.name}/${accountId}`;
        this.logger.debug('Преобразование кастомных полей для базы', loggerContext)

        const convertedFields: ConvertedCustomFields = {
            custom_field: [],
            NPS: null
        }

        for (let field of custom_fields) {
            if (field.field_name === NPSField.FieldName && field.field_type === NPSField.FieldType) {
                convertedFields.NPS = Number(field.values[0]?.value)
            } else {

                let fieldInbase = await this.getField(accountId, field.field_id)

                if (!fieldInbase || fieldInbase.name !== field.field_name) {
                    const newField = fieldFactory(accountId, field)
                    fieldInbase = await this.customFieldsRepository.addOrUpdate(newField)
                }
                const values = field.values?.map(value => String(value.value))
                fieldInbase && convertedFields.custom_field.push({
                    custom_field: fieldInbase._id,
                    values: values
                })
            }
        }
        return convertedFields
    }

    async updateOrCreate(field: CustomFieldDto): Promise<CustomFieldDocument> {
        const loggerContext = `${FieldsProcessing.name}/${this.updateOrCreate.name}`;
        this.logger.debug('Проверка и добавление кастомного поля', loggerContext, field.account_id)
        const fieldInBase = await this.customFieldsRepository.findOne(field.account_id, field.id)
        if (!fieldInBase || fieldInBase.name !== field.name) {
            this.logger.debug('Поле или не найдено, или обновилось', loggerContext, field.account_id)
            return await this.customFieldsRepository.addOrUpdate(field)
        }
        return fieldInBase
    }

    async getField(accountId: number, fieldId: number): Promise<CustomFieldDocument> {
        const loggerContext = `${FieldsProcessing.name}/${this.getField.name}/${accountId}`;
        this.logger.debug('Получение кастомного поля', loggerContext)
        return await this.customFieldsRepository.findOne(accountId, fieldId)
    }
}