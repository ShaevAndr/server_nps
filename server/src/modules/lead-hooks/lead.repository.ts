import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountLeadsDocument, AccountLeads } from './models/account-leads.model';
import { LeadDocument, Lead as LeadModel } from './models/lead.models';
import { Model, Types } from 'mongoose';
import { Logger } from 'core/logger/logger.service';
import { AccountRecord } from './entities/account-record.entity';
import { Lead } from './entities/lead.entity';

@Injectable()
export class LeadsRepository {
    constructor(
        @InjectModel(AccountLeads.name) private readonly accountLeadsRepository: Model<AccountLeads>,
        @InjectModel(LeadModel.name) private readonly leadsRepository: Model<LeadModel>,
        private readonly logger: Logger
    ) { }

    private async initNewAccount(accountId: number, subdomain: string, lead?: Types.ObjectId): Promise<AccountLeadsDocument> {
        const loggerContext = `${LeadsRepository.name}/${this.initNewAccount.name}/account-${accountId}`
        this.logger.info('Инициализация новой записи для хранения сделок', loggerContext)
        try {
            const newAccountRecord = new AccountRecord()
            newAccountRecord.account_id = accountId
            newAccountRecord.subdomain = subdomain
            newAccountRecord.leads = []
            lead && newAccountRecord.leads.push(lead)
            return await this.accountLeadsRepository.create(newAccountRecord);
        } catch (err) {
            this.logger.error('Ошибка инициализация новой записи для хранения сделок', loggerContext, err)
            throw new HttpException('Ошибка при создании новой записи для хранения сделок', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    public async addOrUpdateLead(accountId: number, subdomain: string, lead: Lead): Promise<void> {
        const loggerContext = `${LeadsRepository.name}/${this.addOrUpdateLead.name}/account-${accountId}`
        this.logger.info('Добавление или обновление новой сделки', loggerContext)
        try {
            const newLead = await this.leadsRepository.findOneAndReplace({ account_id: accountId, id: lead.id }, lead, { upsert: true, new: true })

            const recordInBase = await this.accountLeadsRepository.findOne({ account_id: accountId })

            if (recordInBase) {
                const leadInBase = await this.accountLeadsRepository.findOne({ account_id: accountId, subdomain, leads: newLead._id })
                this.logger.debug('сделка в базе', !!leadInBase)
                if (!leadInBase) {
                    await this.accountLeadsRepository.findOneAndUpdate(
                        { account_id: accountId, subdomain },
                        {
                            $push: {
                                leads: newLead._id
                            }
                        },
                        { new: true })
                }
            } else {
                this.logger.debug('новая запись')

                await this.initNewAccount(accountId, subdomain, newLead._id)
            }
        } catch (err) {
            this.logger.error('Ошибка добавления или обновления новой сделки', loggerContext, err)
        }
    }

    public async getLeadById(accountId: number, leadId: number): Promise<LeadDocument> {
        const loggerContext = `${LeadsRepository.name}/${this.getLeadById.name}/account-${accountId}`
        this.logger.info('Получение сделки по её id', loggerContext)
        try {
            return await this.leadsRepository.findOne({ account_id: accountId, id: leadId })
        } catch (err) {
            this.logger.error('Ошибка при получение сделки по её id', loggerContext)
            return null
        }

    }

    public async deleteLeadById(accountId: number, leadId: number): Promise<void> {
        const loggerContext = `${LeadsRepository.name}/${this.deleteLeadById.name}/account-${accountId}`
        this.logger.info('Удаление сделки по её id', loggerContext)
        try {
            const deletedLead = await this.leadsRepository.findOneAndRemove({ account_id: accountId, id: leadId })
            deletedLead &&
                await this.accountLeadsRepository.updateOne(
                    { account_id: accountId },
                    { $pull: { leads: deletedLead._id } }
                )
        } catch (err) {
            this.logger.error('Ошибка при удалении сделки по её id', loggerContext, leadId, err)
        }
    }

    public async deleteAllLeads(accountId: number): Promise<void> {
        const loggerContext = `${LeadsRepository.name}/${this.deleteAllLeads.name}/account-${accountId}`
        this.logger.info('Удаление всех сделок аккаунта', loggerContext)
        try {
            await this.accountLeadsRepository.deleteMany(
                { account_id: accountId }
            )
        } catch (err) {
            this.logger.error('Ошибка при удалении всех сделок аккаунта', loggerContext)
            throw new HttpException('Ошибка при удалении всех сделок аккаунта', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getAllLeads(accountId: number): Promise<any> {
        const loggerContext = `${LeadsRepository.name}/${this.getAllLeads.name}/account-${accountId}`
        this.logger.info('Получение всех сделок', loggerContext)
        try {
            let accountLeads = await this.accountLeadsRepository.findOne({ account_id: accountId }).populate({
                path: 'leads',
                populate: [
                    { path: 'responsible_id' },
                    { path: 'contact_id' },
                    { path: 'company_id' },
                    { path: 'fields.custom_field' },
                ]
            })
            return accountLeads
        } catch (err) {
            this.logger.error('Ошибка при получение всех сделок', loggerContext, err)
            throw new HttpException('Ошибка при получении всех сделок', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}