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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldsRepository = void 0;
const common_1 = require("@nestjs/common");
const custom_fields_model_1 = require("./models/custom-fields.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const logger_service_1 = require("../../core/logger/logger.service");
let CustomFieldsRepository = class CustomFieldsRepository {
    constructor(customFieldsRepository, logger) {
        this.customFieldsRepository = customFieldsRepository;
        this.logger = logger;
    }
    async findOne(accountId, fieldId) {
        try {
            this.logger.info('Поиск поля по аккаунту и id поля', accountId);
            return await this.customFieldsRepository.findOne({ account_id: accountId, id: fieldId });
        }
        catch (err) {
            this.logger.error('Ошибка при поиске поля', err, accountId);
            return null;
        }
    }
    async addOrUpdate(custom_field) {
        try {
            this.logger.info('Добавление или обновление поля', custom_field.account_id);
            return await this.customFieldsRepository.findOneAndUpdate({ account_id: custom_field.account_id, id: custom_field.id }, custom_field, { upsert: true, new: true });
        }
        catch (err) {
            this.logger.error('Ошибка при добавлении/обновлении кастомного поля', err, custom_field.account_id);
            return null;
        }
    }
};
exports.CustomFieldsRepository = CustomFieldsRepository;
exports.CustomFieldsRepository = CustomFieldsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(custom_fields_model_1.CustomField.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        logger_service_1.Logger])
], CustomFieldsRepository);
//# sourceMappingURL=custom-fields.repository.js.map