"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FieldsProcessing_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsProcessing = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../../../core/logger/logger.service");
const custom_fields_repository_1 = require("../../repositiries/custom-fields.repository");
const factory_1 = require("../../utils/factory");
const app_constants_1 = require("../../../../core/constants/app.constants");
let FieldsProcessing = FieldsProcessing_1 = class FieldsProcessing {
    constructor(logger, customFieldsRepository) {
        this.logger = logger;
        this.customFieldsRepository = customFieldsRepository;
    }
    async convertCustomFields(accountId, custom_fields) {
        const loggerContext = `${FieldsProcessing_1.name}/${this.convertCustomFields.name}/${accountId}`;
        this.logger.debug('Преобразование кастомных полей для базы', loggerContext);
        const convertedFields = {
            custom_field: [],
            NPS: null
        };
        for (let field of custom_fields) {
            if (field.field_name === app_constants_1.NPSField.FieldName && field.field_type === app_constants_1.NPSField.FieldType) {
                convertedFields.NPS = Number(field.values[0]?.value);
            }
            else {
                let fieldInbase = await this.getField(accountId, field.field_id);
                if (!fieldInbase || fieldInbase.name !== field.field_name) {
                    const newField = (0, factory_1.fieldFactory)(accountId, field);
                    fieldInbase = await this.customFieldsRepository.addOrUpdate(newField);
                }
                const values = field.values?.map(value => String(value.value));
                fieldInbase && convertedFields.custom_field.push({
                    custom_field: fieldInbase._id,
                    values: values
                });
            }
        }
        return convertedFields;
    }
    async updateOrCreate(field) {
        const loggerContext = `${FieldsProcessing_1.name}/${this.updateOrCreate.name}`;
        this.logger.debug('Проверка и добавление кастомного поля', loggerContext, field.account_id);
        const fieldInBase = await this.customFieldsRepository.findOne(field.account_id, field.id);
        if (!fieldInBase || fieldInBase.name !== field.name) {
            this.logger.debug('Поле или не найдено, или обновилось', loggerContext, field.account_id);
            return await this.customFieldsRepository.addOrUpdate(field);
        }
        return fieldInBase;
    }
    async getField(accountId, fieldId) {
        const loggerContext = `${FieldsProcessing_1.name}/${this.getField.name}/${accountId}`;
        this.logger.debug('Получение кастомного поля', loggerContext);
        return await this.customFieldsRepository.findOne(accountId, fieldId);
    }
};
exports.FieldsProcessing = FieldsProcessing;
exports.FieldsProcessing = FieldsProcessing = FieldsProcessing_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.Logger,
        custom_fields_repository_1.CustomFieldsRepository])
], FieldsProcessing);
//# sourceMappingURL=fields-processing.js.map