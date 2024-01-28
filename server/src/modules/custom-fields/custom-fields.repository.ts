import { Injectable } from '@nestjs/common';
import { CustomField, CustomFieldDocument } from './models/custom-fields.model'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from 'core/logger/logger.service';
import { Field } from './entities/custom-field.entities';

@Injectable()
export class CustomFieldsRepository {
    constructor(
        @InjectModel(CustomField.name) private readonly customFieldsRepository: Model<CustomField>,
        private readonly logger: Logger
    ) { }

    public async findOne(accountId: number, fieldId: number): Promise<CustomFieldDocument> {
        try {
            this.logger.info('Поиск поля по аккаунту и id поля', accountId);
            return await this.customFieldsRepository.findOne({ account_id: accountId, id: fieldId })
        }
        catch (err) {
            this.logger.error('Ошибка при поиске поля', err, accountId);
            return null
        }
    }

    public async addOrUpdate(custom_field: Field): Promise<CustomFieldDocument> {
        try {
            this.logger.info('Добавление или обновление поля', custom_field.account_id);
            return await this.customFieldsRepository.findOneAndUpdate(
                { account_id: custom_field.account_id, id: custom_field.id },
                custom_field,
                { upsert: true, new: true }
            )
        }
        catch (err) {
            this.logger.error('Ошибка при добавлении/обновлении кастомного поля', err, custom_field.account_id);
            return null
        }
    }

}