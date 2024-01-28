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
var ReportSettingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSettingsService = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../core/logger/logger.service");
const report_settings_repository_1 = require("./report-settings.repository");
let ReportSettingsService = ReportSettingsService_1 = class ReportSettingsService {
    constructor(logger, reportSettingsRepository) {
        this.logger = logger;
        this.reportSettingsRepository = reportSettingsRepository;
    }
    async addNewSettings(newSettings) {
        const loggerContext = `${ReportSettingsService_1.name}/${this.addNewSettings.name}`;
        try {
            this.logger.info('Добавление новой настройки', loggerContext, newSettings.subdomain);
            return this.reportSettingsRepository.updateSettingsByName(newSettings);
        }
        catch (err) {
            this.logger.error('Ошибка добавления новых настроек', loggerContext, newSettings.subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async changeSetings(newSettings) {
        const loggerContext = `${ReportSettingsService_1.name}/${this.changeSetings.name}`;
        try {
            this.logger.info('Изменение настроек', loggerContext, newSettings.subdomain);
            return this.reportSettingsRepository.updateSettingsByName(newSettings);
        }
        catch (err) {
            this.logger.error('Ошибка при изменении настроек', loggerContext, newSettings.subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteSetings(settingIdentificator) {
        const loggerContext = `${ReportSettingsService_1.name}/${this.deleteSetings.name}`;
        try {
            this.logger.info('Удаление настроек', loggerContext, settingIdentificator.subdomain);
            this.reportSettingsRepository.deleteSettings(settingIdentificator);
        }
        catch (err) {
            this.logger.error('Ошибка при удалении настроек', loggerContext, settingIdentificator.subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSettings(settingIdentificator) {
        const loggerContext = `${ReportSettingsService_1.name}/${this.getSettings.name}`;
        try {
            this.logger.info('получение настроек', loggerContext, settingIdentificator.subdomain);
            return this.reportSettingsRepository.getSettingsByName(settingIdentificator);
        }
        catch (err) {
            this.logger.error('Ошибка при удалении настроек', loggerContext, settingIdentificator.subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllSettings(account) {
        const loggerContext = `${ReportSettingsService_1.name}/${this.getAllSettings.name}`;
        try {
            this.logger.info('получение всех настроек субдомена', loggerContext, account.subdomain);
            return this.reportSettingsRepository.getAllSettings(account.account_id, account.subdomain);
        }
        catch (err) {
            this.logger.error('Ошибка при получении всех настроек субдомена', loggerContext, account.subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ReportSettingsService = ReportSettingsService;
exports.ReportSettingsService = ReportSettingsService = ReportSettingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.Logger,
        report_settings_repository_1.ReportSettingsRepository])
], ReportSettingsService);
//# sourceMappingURL=report-settings.services.js.map