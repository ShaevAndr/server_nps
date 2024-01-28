import { Contact, ContactDocument } from './models/contact.model';
import { Model } from 'mongoose';
import { Logger } from 'core/logger/logger.service';
import { Contact as ContactEntity } from './core/contact.entity';
export declare class ContactRepository {
    private readonly contactRepository;
    private readonly logger;
    constructor(contactRepository: Model<Contact>, logger: Logger);
    findOne(accountId: number, contactId: number): Promise<ContactDocument>;
    addOrUpdate(Contact: ContactEntity): Promise<ContactDocument>;
}
