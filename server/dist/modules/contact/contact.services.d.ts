import { Logger } from "core/logger/logger.service";
import { ContactDocument } from './models/contact.model';
import { ContactRepository } from "modules/contact/contact.repository";
import { AmoApiService } from "modules/amo-api/amo-api.service";
import { Contact } from "modules/contact/core/contact.entity";
export declare class ContactServices {
    private logger;
    private contactRepository;
    private amoApi;
    constructor(logger: Logger, contactRepository: ContactRepository, amoApi: AmoApiService);
    getContact(accountId: number, contactId: number): Promise<ContactDocument>;
    updateContact(contact: Contact): Promise<ContactDocument>;
}
