import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReportSettingsDto } from './dtos/report-settings.dto';
import { Logger } from 'core/logger/logger.service';
import { ReportSettingsRepository } from './report-settings.repository';
import { ReportSettings } from './models/report-settings.model';
import { DeleteReportSettingsDto } from './dtos/report-setting-delete.dto';
import { GetSettingsDto } from './dtos/report-setting-get.dto';
import { AccountDto } from './dtos/account.dto';

@Injectable()
export class ReportSettingsService {
    constructor(
        private logger: Logger,
        private reportSettingsRepository: ReportSettingsRepository,
    ) { }

    public async addNewSettings(newSettings: ReportSettingsDto): Promise<ReportSettings> {
        const loggerContext = `${ReportSettingsService.name}/${this.addNewSettings.name}`;
        try {
            this.logger.info('Добавление новой настройки', loggerContext, newSettings.subdomain);
            return this.reportSettingsRepository.updateSettingsByName(newSettings)
        } catch (err) {
            this.logger.error('Ошибка добавления новых настроек', loggerContext, newSettings.subdomain)
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async changeSetings(newSettings: ReportSettingsDto): Promise<ReportSettings> {
        const loggerContext = `${ReportSettingsService.name}/${this.changeSetings.name}`;
        try {
            this.logger.info('Изменение настроек', loggerContext, newSettings.subdomain)
            return this.reportSettingsRepository.updateSettingsByName(newSettings)
        } catch (err) {
            this.logger.error('Ошибка при изменении настроек', loggerContext, newSettings.subdomain)
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async deleteSetings(settingIdentificator: DeleteReportSettingsDto): Promise<void> {
        const loggerContext = `${ReportSettingsService.name}/${this.deleteSetings.name}`;
        try {
            this.logger.info('Удаление настроек', loggerContext, settingIdentificator.subdomain)
            this.reportSettingsRepository.deleteSettings(settingIdentificator)

        } catch (err) {
            this.logger.error('Ошибка при удалении настроек', loggerContext, settingIdentificator.subdomain)
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getSettings(settingIdentificator: GetSettingsDto): Promise<ReportSettings> {
        const loggerContext = `${ReportSettingsService.name}/${this.getSettings.name}`;
        try {
            this.logger.info('получение настроек', loggerContext, settingIdentificator.subdomain)
            return this.reportSettingsRepository.getSettingsByName(settingIdentificator)
        } catch (err) {
            this.logger.error('Ошибка при удалении настроек', loggerContext, settingIdentificator.subdomain)
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    public async getAllSettings(account: AccountDto): Promise<ReportSettings[]> {
        const loggerContext = `${ReportSettingsService.name}/${this.getAllSettings.name}`;
        try {
            this.logger.info('получение всех настроек субдомена', loggerContext, account.subdomain)
            return this.reportSettingsRepository.getAllSettings(account.account_id, account.subdomain)
        } catch (err) {
            this.logger.error('Ошибка при получении всех настроек субдомена', loggerContext, account.subdomain)
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

}