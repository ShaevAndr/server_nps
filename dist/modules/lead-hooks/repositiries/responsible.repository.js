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
exports.ResponsibleRepository = void 0;
const common_1 = require("@nestjs/common");
const responsible_model_1 = require("../models/responsible.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const logger_service_1 = require("../../../core/logger/logger.service");
let ResponsibleRepository = class ResponsibleRepository {
    constructor(responsibleRepository, logger) {
        this.responsibleRepository = responsibleRepository;
        this.logger = logger;
    }
    async addOrUpdate(user) {
        try {
            this.logger.info('Добавление или обновление ответственного', user.account_id);
            return this.responsibleRepository.findOneAndUpdate({ account_id: user.account_id, id: user.id }, user, { upsert: true, new: true });
        }
        catch (err) {
            this.logger.error('Ошибка при добавлении/обновлении ответственного', err, user.account_id);
            return null;
        }
    }
    async getByUserId(accountId, userId) {
        try {
            this.logger.debug('получениии пользователя по id', accountId);
            return await this.responsibleRepository.findOne({ account_id: accountId, id: userId });
        }
        catch (err) {
            this.logger.error('Ошибка при получениии всех полей аккаунта', err, accountId);
            return null;
        }
    }
    async deleteAllUsers(accountId) {
        try {
            this.logger.info('Удаление пользоватей по id аккаунта', accountId);
            await this.responsibleRepository.deleteMany({ account_id: accountId });
        }
        catch (err) {
            this.logger.error('Ошибка при удалении ответственных', err, accountId);
        }
    }
};
exports.ResponsibleRepository = ResponsibleRepository;
exports.ResponsibleRepository = ResponsibleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(responsible_model_1.Responsible.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        logger_service_1.Logger])
], ResponsibleRepository);
//# sourceMappingURL=responsible.repository.js.map