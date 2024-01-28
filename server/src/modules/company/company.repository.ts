import { Injectable } from '@nestjs/common';
import { Company, CompanyDocument } from './models/company.model'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from 'core/logger/logger.service';
import { Company as CompanyEntity } from './entities/company.entity';


@Injectable()
export class CompanyRepository {
    constructor(
        @InjectModel(Company.name) private readonly companyRepository: Model<Company>,
        private readonly logger: Logger
    ) { }

    public async findOne(accountId: number, companyId: number): Promise<CompanyDocument> {
        try {
            this.logger.info('Поиск компании по аккаунту и id поля', accountId);
            return await this.companyRepository.findOne({ account_id: accountId, id: companyId })
        }
        catch (err) {
            this.logger.error('Ошибка при поиске компании', err, accountId);
            return null
        }
    }

    public async addOrUpdate(company: CompanyEntity): Promise<CompanyDocument> {
        try {
            this.logger.info('Добавление или обновление компании', company.account_id);
            return await this.companyRepository.findOneAndUpdate(
                { account_id: company.account_id, id: company.id },
                company,
                { upsert: true, new: true }
            )
        }
        catch (err) {
            this.logger.error('Ошибка при добавлении/обновлении компании', err, company.account_id);
            return null
        }
    }
}