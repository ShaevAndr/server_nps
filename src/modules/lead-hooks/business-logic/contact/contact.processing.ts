import { Injectable } from "@nestjs/common";
import { Logger } from "core/logger/logger.service";
import { ContactDocument } from '../../models/contact.model'
import { ContactRepository } from "modules/lead-hooks/repositiries/contact.repository";
import { AmoApiService } from "modules/amo-api/amo-api.service";
import { Contact } from "modules/lead-hooks/core/contact.entity";
import { AmoContact } from "modules/amo-api/types/amo-api.types";
import { contactFactory } from "modules/lead-hooks/utils/factory";

@Injectable()
export class ContactProcessing {
    constructor(
        private logger: Logger,
        private contactRepository: ContactRepository,
        private amoApi: AmoApiService
    ) { }

    async getContact(accountId: number, contactId: number): Promise<ContactDocument> {
        const loggerContext = `${ContactProcessing.name}/${this.getContact.name}`;
        this.logger.debug('Получении контакта', loggerContext)

        const contactInBase = await this.contactRepository.findOne(accountId, contactId)
        if (!contactInBase) {

            const fetchContact = await this.amoApi.getEntityInfo<AmoContact>({ accountId }, contactId, 'contacts')
            if (fetchContact) {
                const newContact = contactFactory(accountId, contactId, fetchContact.name)
                return await this.updateContact(newContact)
            }
        }
        return contactInBase
    }

    async updateContact(contact: Contact): Promise<ContactDocument> {
        const loggerContext = `${ContactProcessing.name}/${this.updateContact.name}`;
        this.logger.debug('Создание нового контакта в базе или обновление', loggerContext, contact.account_id)
        return await this.contactRepository.addOrUpdate(contact)
    }
}