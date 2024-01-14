import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from 'core/logger/logger.service';
import { LeadsProcessing } from './business-logic/leads/leads-processing';
import { ContactProcessing } from './business-logic/contact/contact.processing';
import { CompanyProcessing } from './business-logic/company/company.processing';
import { companyFactory, contactFactory } from './utils/factory';
import { UpdateHookDto } from './dtos/update-hook.dto';
import { DeleteHookDto } from './dtos/delete-lead-hook.dto';
import { ContactType } from './dtos/contact-types';

@Injectable()
export class LeadHookService {
    constructor(
        private logger: Logger,
        private leadsServices: LeadsProcessing,
        private contactServices: ContactProcessing,
        private companyServices: CompanyProcessing
    ) { }

    async updateEntity(hook: UpdateHookDto): Promise<void> {
        const loggerContext = `${LeadHookService.name}/${this.updateEntity.name}/${hook.account.id}`
        this.logger.info('Хук на изменение сущности', loggerContext)

        if (hook.leads) {
            for (let lead of hook.leads.update)
                this.leadsServices.updateLead(hook.account.subdomain, Number(hook.account.id), lead.id)
        }

        if (hook.contacts) {
            for (let entity of hook.contacts.update) {
                if (entity.type === ContactType.Company) {
                    const company = companyFactory(entity.account_id, entity.id, entity.name)
                    this.companyServices.updateCompany(company)
                }
                if (entity.type === ContactType.Contact) {
                    const contact = contactFactory(entity.account_id, entity.id, entity.name)
                    this.contactServices.updateContact(contact)
                }
            }
        }
    }

    async deleteLead(hook: DeleteHookDto): Promise<void> {
        const loggerContext = `${LeadHookService.name}/${this.deleteLead.name}/${hook.account.id}`
        this.logger.info('Хук на удаление сделки', loggerContext)
        this.leadsServices.deleteLeadById(hook.account.id, hook.leads)
    }

    async deleteAllLeads(accountId: number): Promise<void> {
        const loggerContext = `${LeadHookService.name}/${this.deleteLead.name}/${accountId}`
        this.logger.info('Хук на удаление всех сделок', loggerContext)
        this.leadsServices.deleteAllLeads(accountId)
    }

    async fetchAllLeads(accountId: number, subdomain: string): Promise<void> {
        const loggerContext = `${LeadHookService.name}/${this.deleteLead.name}/${accountId}`
        this.logger.info('Получение всех сделок', loggerContext)
        this.leadsServices.addAllLeads(accountId, subdomain)
    }
}