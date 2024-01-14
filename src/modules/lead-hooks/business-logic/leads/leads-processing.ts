import { Injectable } from "@nestjs/common";
import { Logger } from "core/logger/logger.service";
import { LeadsRepository } from "modules/lead-hooks/repositiries/lead.repository";
import { FieldsProcessing } from "../fields/fields-processing";
import { CompanyProcessing } from "../company/company.processing";
import { ContactProcessing } from "../contact/contact.processing";
import { ResponsibleProcessing } from "../responsible/responsible.processing";
import { AmoApiService } from "modules/amo-api/amo-api.service";
import { leadFactory } from "modules/lead-hooks/utils/factory";
import { AmoLead, Pipeline } from "modules/amo-api/types/amo-api.types";
import { LeadsDto } from "modules/lead-hooks/dtos/delete-lead-hook.dto";
import { AccountLeadsDocument } from "modules/lead-hooks/models/account-leads.model";

@Injectable()
export class LeadsProcessing {
    constructor(
        private logger: Logger,
        private leadsRepository: LeadsRepository,
        private fieldProcessing: FieldsProcessing,
        private companyProcessing: CompanyProcessing,
        private contactProcessing: ContactProcessing,
        private responsibleProcessing: ResponsibleProcessing,
        private amoApi: AmoApiService
    ) { }

    async getAllLeads(accountId: number): Promise<AccountLeadsDocument> {
        const loggerContext = `${LeadsProcessing.name}/${this.getAllLeads.name}`
        this.logger.info('Получение всех сделок', loggerContext, accountId)
        return await this.leadsRepository.getAllLeads(accountId)
    }

    async updateLead(subdomain: string, accountId: number, leadId: number): Promise<void> {
        const loggerContext = `${LeadsProcessing.name}/${this.updateLead.name}/${subdomain}`
        this.logger.info('Добавление или обновление сделки', loggerContext)
        const amoLead = await this.amoApi.getLeadInfo({ accountId, subdomain }, leadId)
        amoLead && this.addOrUpdateLeadInBase(subdomain, accountId, amoLead)
    }

    private async addOrUpdateLeadInBase(subdomain: string, accountId: number, amoLead: AmoLead): Promise<void> {
        const loggerContext = `${LeadsProcessing.name}/${this.addOrUpdateLeadInBase.name}/${subdomain}`
        this.logger.info('Добавление или обновление сделки в базе', loggerContext)

        const newLead = leadFactory(amoLead)

        if (!amoLead.custom_fields_values?.length) {
            await this.leadsRepository.deleteLeadById(accountId, amoLead.id)
            return
        }
        const fields = await this.fieldProcessing.convertCustomFields(accountId, amoLead.custom_fields_values)
        if (!fields?.NPS && fields?.NPS !== 0) {
            await this.leadsRepository.deleteLeadById(accountId, amoLead.id)
            return
        }

        newLead.NPS = fields.NPS
        newLead.fields = fields.custom_field

        const responsibleInBase = await this.responsibleProcessing.getResponsible(accountId, subdomain, amoLead.responsible_user_id)
        newLead.responsible_id = responsibleInBase?._id || amoLead.responsible_user_id

        const pipeline = await this.amoApi.getEntityInfo<Pipeline>({ accountId, subdomain }, amoLead.pipeline_id, 'leads/pipelines')
        newLead.pipeline = pipeline.name || String(amoLead.pipeline_id)

        if (amoLead._embedded.companies?.length) {
            for (let company of amoLead._embedded.companies) {
                const companyInBase = await this.companyProcessing.getCompany(accountId, company.id)
                const newCompany = companyInBase ? companyInBase._id : company.id
                newLead.company_id.push(newCompany)
            }
        } else {
            newLead.company_id = []
        }

        if (amoLead._embedded.contacts?.length) {
            for (let contact of amoLead._embedded.contacts) {
                if (contact.is_main) {
                    const contactInBase = await this.contactProcessing.getContact(accountId, contact.id)
                    const newContact = contactInBase ? contactInBase._id : contact.id
                    newLead.contact_id = newContact
                }
            }
        } else {
            newLead.contact_id = null
        }

        await this.leadsRepository.addOrUpdateLead(accountId, subdomain, newLead)
    }

    async deleteAllLeads(accountId: number): Promise<void> {
        const loggerContext = `${LeadsProcessing.name}/${this.deleteAllLeads.name}`
        this.logger.info('Удаление всех сделок из аккаунта', loggerContext, accountId)
        await this.leadsRepository.deleteAllLeads(accountId)
    }

    async deleteLeadById(accountId: number, leads: LeadsDto): Promise<void> {
        const loggerContext = `${LeadsProcessing.name}/${this.deleteLeadById.name}`
        this.logger.info('Удаление сделки из коллекции', loggerContext, accountId)
        for (let lead of leads.delete) {
            await this.leadsRepository.deleteLeadById(accountId, lead.id)
        }
    }

    async addAllLeads(accountId: number, subdomain: string): Promise<void> {
        const loggerContext = `${LeadsProcessing.name}/${this.addAllLeads.name}`
        this.logger.info('Добавление всех сделок из аккаунта.', loggerContext, subdomain, accountId)
        const leads = await this.amoApi.getAllLeads({ accountId, subdomain }, { with: 'contacts' })
        if (leads?.length) {
            for (const lead of leads) {
                await this.addOrUpdateLeadInBase(subdomain, accountId, lead)
            }
        }
    }
}