import { Injectable } from '@nestjs/common';
import { ResponsibleDocument, Responsible } from '../models/responsible.model'
import { Responsible as ResponsibleEntity } from '../core/responsible.entities'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from 'core/logger/logger.service';

@Injectable()
export class ResponsibleRepository {
    constructor(
        @InjectModel(Responsible.name) private readonly responsibleRepository: Model<Responsible>,
        private readonly logger: Logger,
    ) { }

    async addOrUpdate(user: ResponsibleEntity): Promise<ResponsibleDocument> {
        try {
            this.logger.info('Добавление или обновление ответственного', user.account_id);
            return this.responsibleRepository.findOneAndUpdate(
                { account_id: user.account_id, id: user.id },
                user,
                { upsert: true, new: true }
            )
        }
        catch (err) {
            this.logger.error('Ошибка при добавлении/обновлении ответственного', err, user.account_id);
            return null
        }
    }

    async getByUserId(accountId: number, userId: number): Promise<ResponsibleDocument> {
        try {
            this.logger.debug('получениии пользователя по id', accountId);
            return await this.responsibleRepository.findOne({ account_id: accountId, id: userId })
        }
        catch (err) {
            this.logger.error('Ошибка при получениии всех полей аккаунта', err, accountId);
            return null
        }
    }

    async deleteAllUsers(accountId: number,): Promise<void> {
        try {
            this.logger.info('Удаление пользоватей по id аккаунта', accountId);
            await this.responsibleRepository.deleteMany({ account_id: accountId })
        }
        catch (err) {
            this.logger.error('Ошибка при удалении ответственных', err, accountId);
        }
    }

}