"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LeadsRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const account_leads_model_1 = require("./models/account-leads.model");
const lead_models_1 = require("./models/lead.models");
const mongoose_2 = require("mongoose");
const logger_service_1 = require("../../core/logger/logger.service");
const account_record_entity_1 = require("./core/account-record.entity");
let LeadsRepository = LeadsRepository_1 = class LeadsRepository {
    constructor(accountLeadsRepository, leadsRepository, logger) {
        this.accountLeadsRepository = accountLeadsRepository;
        this.leadsRepository = leadsRepository;
        this.logger = logger;
    }
    async initNewAccount(accountId, subdomain, lead) {
        const loggerContext = `${LeadsRepository_1.name}/${this.initNewAccount.name}/account-${accountId}`;
        this.logger.info('Инициализация новой записи для хранения сделок', loggerContext);
        try {
            const newAccountRecord = new account_record_entity_1.AccountRecord();
            newAccountRecord.account_id = accountId;
            newAccountRecord.subdomain = subdomain;
            newAccountRecord.leads = [];
            lead && newAccountRecord.leads.push(lead);
            return await this.accountLeadsRepository.create(newAccountRecord);
        }
        catch (err) {
            this.logger.error('Ошибка инициализация новой записи для хранения сделок', loggerContext, err);
            throw new common_1.HttpException('Ошибка при создании новой записи для хранения сделок', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addOrUpdateLead(accountId, subdomain, lead) {
        const loggerContext = `${LeadsRepository_1.name}/${this.addOrUpdateLead.name}/account-${accountId}`;
        this.logger.info('Добавление или обновление новой сделки', loggerContext);
        try {
            const newLead = await this.leadsRepository.findOneAndReplace({ account_id: accountId, id: lead.id }, lead, { upsert: true, new: true });
            const recordInBase = await this.accountLeadsRepository.findOne({ account_id: accountId });
            if (recordInBase) {
                const leadInBase = await this.accountLeadsRepository.findOne({ account_id: accountId, subdomain, leads: newLead._id });
                this.logger.debug('сделка в базе', !!leadInBase);
                if (!leadInBase) {
                    await this.accountLeadsRepository.findOneAndUpdate({ account_id: accountId, subdomain }, {
                        $push: {
                            leads: newLead._id
                        }
                    }, { new: true });
                }
            }
            else {
                this.logger.debug('новая запись');
                await this.initNewAccount(accountId, subdomain, newLead._id);
            }
        }
        catch (err) {
            this.logger.error('Ошибка добавления или обновления новой сделки', loggerContext, err);
        }
    }
    async getLeadById(accountId, leadId) {
        const loggerContext = `${LeadsRepository_1.name}/${this.getLeadById.name}/account-${accountId}`;
        this.logger.info('Получение сделки по её id', loggerContext);
        try {
            return await this.leadsRepository.findOne({ account_id: accountId, id: leadId });
        }
        catch (err) {
            this.logger.error('Ошибка при получение сделки по её id', loggerContext);
            return null;
        }
    }
    async deleteLeadById(accountId, leadId) {
        const loggerContext = `${LeadsRepository_1.name}/${this.deleteLeadById.name}/account-${accountId}`;
        this.logger.info('Удаление сделки по её id', loggerContext);
        try {
            const deletedLead = await this.leadsRepository.findOneAndRemove({ account_id: accountId, id: leadId });
            await this.accountLeadsRepository.updateOne({ account_id: accountId }, { $pull: { leads: deletedLead._id } });
        }
        catch (err) {
            this.logger.error('Ошибка при удалении сделки по её id', loggerContext, leadId, err);
        }
    }
    async deleteAllLeads(accountId) {
        const loggerContext = `${LeadsRepository_1.name}/${this.deleteAllLeads.name}/account-${accountId}`;
        this.logger.info('Удаление всех сделок аккаунта', loggerContext);
        try {
            await this.accountLeadsRepository.deleteMany({ account_id: accountId });
        }
        catch (err) {
            this.logger.error('Ошибка при удалении всех сделок аккаунта', loggerContext);
            throw new common_1.HttpException('Ошибка при удалении всех сделок аккаунта', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllLeads(accountId) {
        const loggerContext = `${LeadsRepository_1.name}/${this.getAllLeads.name}/account-${accountId}`;
        this.logger.info('Получение всех сделок', loggerContext);
        try {
            const accountLeads = await this.accountLeadsRepository.findOne({ account_id: accountId });
            return accountLeads;
        }
        catch (err) {
            this.logger.error('Ошибка при получение всех сделок', loggerContext);
            throw new common_1.HttpException('Ошибка при получении всех сделок', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LeadsRepository = LeadsRepository;
exports.LeadsRepository = LeadsRepository = LeadsRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(account_leads_model_1.AccountLeads.name)),
    __param(1, (0, mongoose_1.InjectModel)(lead_models_1.Lead.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        logger_service_1.Logger])
], LeadsRepository);
//# sourceMappingURL=lead.repository.js.map