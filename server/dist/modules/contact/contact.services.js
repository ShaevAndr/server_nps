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
var ContactServices_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactServices = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../core/logger/logger.service");
const contact_repository_1 = require("./contact.repository");
const amo_api_service_1 = require("../amo-api/amo-api.service");
const factory_1 = require("../lead-hooks/utils/factory");
let ContactServices = ContactServices_1 = class ContactServices {
    constructor(logger, contactRepository, amoApi) {
        this.logger = logger;
        this.contactRepository = contactRepository;
        this.amoApi = amoApi;
    }
    async getContact(accountId, contactId) {
        const loggerContext = `${ContactServices_1.name}/${this.getContact.name}`;
        this.logger.debug('Получении контакта', loggerContext);
        const contactInBase = await this.contactRepository.findOne(accountId, contactId);
        if (!contactInBase) {
            const fetchContact = await this.amoApi.getEntityInfo({ accountId }, contactId, 'contacts');
            if (fetchContact) {
                const newContact = (0, factory_1.contactFactory)(accountId, contactId, fetchContact.name);
                return await this.updateContact(newContact);
            }
        }
        return contactInBase;
    }
    async updateContact(contact) {
        const loggerContext = `${ContactServices_1.name}/${this.updateContact.name}`;
        this.logger.debug('Создание нового контакта в базе или обновление', loggerContext, contact.account_id);
        return await this.contactRepository.addOrUpdate(contact);
    }
};
exports.ContactServices = ContactServices;
exports.ContactServices = ContactServices = ContactServices_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.Logger,
        contact_repository_1.ContactRepository,
        amo_api_service_1.AmoApiService])
], ContactServices);
//# sourceMappingURL=contact.services.js.map