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
var LeadHookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadHookService = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../core/logger/logger.service");
const leads_processing_1 = require("./business-logic/leads-processing");
const contact_services_1 = require("../contact/contact.services");
const company_services_1 = require("../company/company.services");
const factory_1 = require("./utils/factory");
const contact_types_1 = require("../../types/contact-types");
let LeadHookService = LeadHookService_1 = class LeadHookService {
    constructor(logger, leadsServices, contactServices, companyServices) {
        this.logger = logger;
        this.leadsServices = leadsServices;
        this.contactServices = contactServices;
        this.companyServices = companyServices;
    }
    async updateEntity(hook) {
        const loggerContext = `${LeadHookService_1.name}/${this.updateEntity.name}/${hook.account.id}`;
        this.logger.info('Хук на изменение сущности', loggerContext);
        if (hook.leads) {
            for (let lead of hook.leads.update)
                await this.leadsServices.updateLead(hook.account.subdomain, Number(hook.account.id), lead.id);
        }
        if (hook.contacts) {
            for (let entity of hook.contacts.update) {
                if (entity.type === contact_types_1.ContactType.Company) {
                    const company = (0, factory_1.companyFactory)(entity.account_id, entity.id, entity.name);
                    await this.companyServices.updateCompany(company);
                }
                if (entity.type === contact_types_1.ContactType.Contact) {
                    const contact = (0, factory_1.contactFactory)(entity.account_id, entity.id, entity.name);
                    await this.contactServices.updateContact(contact);
                }
            }
        }
    }
    async deleteLead(hook) {
        const loggerContext = `${LeadHookService_1.name}/${this.deleteLead.name}/${hook.account.id}`;
        this.logger.info('Хук на удаление сделки', loggerContext);
        this.leadsServices.deleteLeadById(hook.account.id, hook.leads);
    }
    async deleteAllLeads(accountId) {
        const loggerContext = `${LeadHookService_1.name}/${this.deleteLead.name}/${accountId}`;
        this.logger.info('Хук на удаление всех сделок', loggerContext);
        await this.leadsServices.deleteAllLeads(accountId);
    }
    async fetchAllLeads(accountId, subdomain) {
        const loggerContext = `${LeadHookService_1.name}/${this.deleteLead.name}/${accountId}`;
        this.logger.info('Получение всех сделок', loggerContext);
        await this.leadsServices.addAllLeads(accountId, subdomain);
    }
};
exports.LeadHookService = LeadHookService;
exports.LeadHookService = LeadHookService = LeadHookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.Logger,
        leads_processing_1.LeadsProcessing,
        contact_services_1.ContactServices,
        company_services_1.CompanyServices])
], LeadHookService);
//# sourceMappingURL=lead-hooks.services.js.map