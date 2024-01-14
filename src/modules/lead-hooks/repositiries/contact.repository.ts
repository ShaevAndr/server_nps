import { Injectable } from '@nestjs/common';
import { Contact, ContactDocument } from '../models/Contact.model'
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Logger } from 'core/logger/logger.service';
import { Contact as ContactEntity } from '../core/contact.entity';


@Injectable()
export class ContactRepository {
    constructor(
        @InjectModel(Contact.name) private readonly contactRepository: Model<Contact>,
        private readonly logger: Logger
    ) { }

    async findOne(accountId: number, contactId: number): Promise<ContactDocument> {
        try {
            this.logger.info('Поиск контакта по аккаунту и id поля', accountId);
            return await this.contactRepository.findOne({ account_id: accountId, id: contactId })
        }
        catch (err) {
            this.logger.error('Ошибка при поиске контакта', err, accountId);
            return null
        }
    }

    async addOrUpdate(Contact: ContactEntity): Promise<ContactDocument> {
        try {
            this.logger.info('Добавление или обновление контакта', Contact.account_id);
            return await this.contactRepository.findOneAndUpdate(
                { account_id: Contact.account_id, id: Contact.id },
                Contact,
                { upsert: true, new: true }
            )
        }
        catch (err) {
            this.logger.error('Ошибка при добавлении/обновлении контакта', err, Contact.account_id);
            return null
        }
    }
}