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
exports.ContactRepository = void 0;
const common_1 = require("@nestjs/common");
const Contact_model_1 = require("../models/Contact.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const logger_service_1 = require("../../../core/logger/logger.service");
let ContactRepository = class ContactRepository {
    constructor(contactRepository, logger) {
        this.contactRepository = contactRepository;
        this.logger = logger;
    }
    async findOne(accountId, contactId) {
        try {
            this.logger.info('Поиск контакта по аккаунту и id поля', accountId);
            return await this.contactRepository.findOne({ account_id: accountId, id: contactId });
        }
        catch (err) {
            this.logger.error('Ошибка при поиске контакта', err, accountId);
            return null;
        }
    }
    async addOrUpdate(Contact) {
        try {
            this.logger.info('Добавление или обновление контакта', Contact.account_id);
            return await this.contactRepository.findOneAndUpdate({ account_id: Contact.account_id, id: Contact.id }, Contact, { upsert: true, new: true });
        }
        catch (err) {
            this.logger.error('Ошибка при добавлении/обновлении контакта', err, Contact.account_id);
            return null;
        }
    }
};
exports.ContactRepository = ContactRepository;
exports.ContactRepository = ContactRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Contact_model_1.Contact.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        logger_service_1.Logger])
], ContactRepository);
//# sourceMappingURL=contact.repository.js.map