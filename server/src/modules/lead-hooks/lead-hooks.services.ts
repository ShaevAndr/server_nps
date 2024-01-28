import { Injectable } from '@nestjs/common';
import { Logger } from 'core/logger/logger.service';
import { LeadsProcessing } from './business-logic/leads-processing';
import { ContactServices } from '../contact/contact.services';
import { CompanyServices } from '../company/company.services';
import { companyFactory, contactFactory } from './utils/factory';
import { UpdateHookDto } from './dtos/update-hook.dto';
import { DeleteHookDto } from './dtos/delete-lead-hook.dto';
import { ContactType } from '../../types/contact-types';

@Injectable()
export class LeadHookService {
    constructor(
        private logger: Logger,
        private leadsServices: LeadsProcessing,
        private contactServices: ContactServices,
        private companyServices: CompanyServices
    ) { }

    public async updateEntity(hook: UpdateHookDto): Promise<void> {
        const loggerContext = `${LeadHookService.name}/${this.updateEntity.name}/${hook.account.id}`
        this.logger.info('Хук на изменение сущности', loggerContext)

        if (hook.leads) {
            for (let lead of hook.leads.update)
                await this.leadsServices.updateLead(hook.account.subdomain, Number(hook.account.id), lead.id)
        }

        if (hook.contacts) {
            for (let entity of hook.contacts.update) {
                if (entity.type === ContactType.Company) {
                    const company = companyFactory(entity.account_id, entity.id, entity.name)
                    await this.companyServices.updateCompany(company)
                }
                if (entity.type === ContactType.Contact) {
                    const contact = contactFactory(entity.account_id, entity.id, entity.name)
                    await this.contactServices.updateContact(contact)
                }
            }
        }
    }

    public async deleteLead(hook: DeleteHookDto): Promise<void> {
        const loggerContext = `${LeadHookService.name}/${this.deleteLead.name}/${hook.account.id}`
        this.logger.info('Хук на удаление сделки', loggerContext)
        this.leadsServices.deleteLeadById(hook.account.id, hook.leads)
    }

    public async deleteAllLeads(accountId: number): Promise<void> {
        const loggerContext = `${LeadHookService.name}/${this.deleteLead.name}/${accountId}`
        this.logger.info('Хук на удаление всех сделок', loggerContext)
        await this.leadsServices.deleteAllLeads(accountId)
    }

    public async fetchAllLeads(accountId: number, subdomain: string): Promise<void> {
        const loggerContext = `${LeadHookService.name}/${this.deleteLead.name}/${accountId}`
        this.logger.info('Получение всех сделок', loggerContext)
        await this.leadsServices.addAllLeads(accountId, subdomain)
    }
}