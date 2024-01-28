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
var LeadsProcessing_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsProcessing = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../../core/logger/logger.service");
const lead_repository_1 = require("../lead.repository");
const fields_services_1 = require("../../custom-fields/fields.services");
const company_services_1 = require("../../company/company.services");
const contact_services_1 = require("../../contact/contact.services");
const responsible_services_1 = require("../../resonsible/responsible.services");
const amo_api_service_1 = require("../../amo-api/amo-api.service");
const factory_1 = require("../utils/factory");
let LeadsProcessing = LeadsProcessing_1 = class LeadsProcessing {
    constructor(logger, leadsRepository, fieldServices, companyServices, contactServices, responsibleServices, amoApi) {
        this.logger = logger;
        this.leadsRepository = leadsRepository;
        this.fieldServices = fieldServices;
        this.companyServices = companyServices;
        this.contactServices = contactServices;
        this.responsibleServices = responsibleServices;
        this.amoApi = amoApi;
    }
    async getAllLeads(accountId) {
        const loggerContext = `${LeadsProcessing_1.name}/${this.getAllLeads.name}`;
        this.logger.info('Получение всех сделок', loggerContext, accountId);
        return await this.leadsRepository.getAllLeads(accountId);
    }
    async updateLead(subdomain, accountId, leadId) {
        const loggerContext = `${LeadsProcessing_1.name}/${this.updateLead.name}/${subdomain}`;
        this.logger.info('Добавление или обновление сделки', loggerContext);
        const amoLead = await this.amoApi.getLeadInfo({ accountId, subdomain }, leadId);
        amoLead && this.addOrUpdateLeadInBase(subdomain, accountId, amoLead);
    }
    async addOrUpdateLeadInBase(subdomain, accountId, amoLead) {
        const loggerContext = `${LeadsProcessing_1.name}/${this.addOrUpdateLeadInBase.name}/${subdomain}`;
        this.logger.info('Добавление или обновление сделки в базе', loggerContext);
        const newLead = (0, factory_1.leadFactory)(amoLead);
        if (!amoLead.custom_fields_values?.length) {
            await this.leadsRepository.deleteLeadById(accountId, amoLead.id);
            return;
        }
        const fields = await this.fieldServices.convertCustomFields(accountId, amoLead.custom_fields_values);
        if (!fields?.NPS && fields?.NPS !== 0) {
            await this.leadsRepository.deleteLeadById(accountId, amoLead.id);
            return;
        }
        newLead.NPS = fields.NPS;
        newLead.fields = fields.custom_field;
        const responsibleInBase = await this.responsibleServices.getResponsible(accountId, subdomain, amoLead.responsible_user_id);
        newLead.responsible_id = responsibleInBase?._id || amoLead.responsible_user_id;
        const pipeline = await this.amoApi.getEntityInfo({ accountId, subdomain }, amoLead.pipeline_id, 'leads/pipelines');
        newLead.pipeline = pipeline.name || String(amoLead.pipeline_id);
        if (amoLead._embedded.companies?.length) {
            for (let company of amoLead._embedded.companies) {
                const companyInBase = await this.companyServices.getCompany(accountId, company.id);
                const newCompany = companyInBase ? companyInBase._id : company.id;
                newLead.company_id.push(newCompany);
            }
        }
        else {
            newLead.company_id = [];
        }
        if (amoLead._embedded.contacts?.length) {
            for (let contact of amoLead._embedded.contacts) {
                if (contact.is_main) {
                    const contactInBase = await this.contactServices.getContact(accountId, contact.id);
                    const newContact = contactInBase ? contactInBase._id : contact.id;
                    newLead.contact_id = newContact;
                }
            }
        }
        else {
            newLead.contact_id = null;
        }
        await this.leadsRepository.addOrUpdateLead(accountId, subdomain, newLead);
    }
    async deleteAllLeads(accountId) {
        const loggerContext = `${LeadsProcessing_1.name}/${this.deleteAllLeads.name}`;
        this.logger.info('Удаление всех сделок из аккаунта', loggerContext, accountId);
        await this.leadsRepository.deleteAllLeads(accountId);
    }
    async deleteLeadById(accountId, leads) {
        const loggerContext = `${LeadsProcessing_1.name}/${this.deleteLeadById.name}`;
        this.logger.info('Удаление сделки из коллекции', loggerContext, accountId);
        for (let lead of leads.delete) {
            await this.leadsRepository.deleteLeadById(accountId, lead.id);
        }
    }
    async addAllLeads(accountId, subdomain) {
        const loggerContext = `${LeadsProcessing_1.name}/${this.addAllLeads.name}`;
        this.logger.info('Добавление всех сделок из аккаунта.', loggerContext, subdomain, accountId);
        const leads = await this.amoApi.getAllLeads({ accountId, subdomain }, { with: 'contacts' });
        if (leads?.length) {
            for (const lead of leads) {
                await this.addOrUpdateLeadInBase(subdomain, accountId, lead);
            }
        }
    }
};
exports.LeadsProcessing = LeadsProcessing;
exports.LeadsProcessing = LeadsProcessing = LeadsProcessing_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.Logger,
        lead_repository_1.LeadsRepository,
        fields_services_1.FieldsServices,
        company_services_1.CompanyServices,
        contact_services_1.ContactServices,
        responsible_services_1.ResponsibleServices,
        amo_api_service_1.AmoApiService])
], LeadsProcessing);
//# sourceMappingURL=leads-processing.js.map