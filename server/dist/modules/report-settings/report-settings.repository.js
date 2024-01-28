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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSettingsRepository = void 0;
const common_1 = require("@nestjs/common");
const report_settings_model_1 = require("./models/report-settings.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const logger_service_1 = require("../../core/logger/logger.service");
let ReportSettingsRepository = class ReportSettingsRepository {
    constructor(reportRepository, logger) {
        this.reportRepository = reportRepository;
        this.logger = logger;
    }
    async getAllSettings(accountId, subdomain) {
        try {
            return this.reportRepository.find({ account_id: accountId }).exec();
        }
        catch (err) {
            this.logger.error('Ошибка при получении всех настроек', err, subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSettingsByName(settingsInfo) {
        try {
            return this.reportRepository.findOne({ name: settingsInfo.name, account_id: settingsInfo.account_id }).exec();
        }
        catch (err) {
            this.logger.error('Ошибка при получении настроек по имени', err, settingsInfo.subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateSettingsByName(reportSettings) {
        try {
            return this.reportRepository.findOneAndUpdate({ name: reportSettings.name, account_id: reportSettings.account_id }, reportSettings, { upsert: true, new: true });
        }
        catch (err) {
            this.logger.error('Ошибка при обновлении или добавлении настроек ', err, reportSettings.subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteSettings(settingsInfo) {
        try {
            this.reportRepository.deleteOne({ name: settingsInfo.name, account_id: settingsInfo.account_id }).exec();
        }
        catch (err) {
            this.logger.error('Ошибка при удалении настроек ', err, settingsInfo.subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ReportSettingsRepository = ReportSettingsRepository;
exports.ReportSettingsRepository = ReportSettingsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(report_settings_model_1.ReportSettings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        logger_service_1.Logger])
], ReportSettingsRepository);
//# sourceMappingURL=report-settings.repository.js.map