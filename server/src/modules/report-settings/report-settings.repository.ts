import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReportSettings } from './models/report-settings.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportSettingsDto } from './dtos/report-settings.dto';
import { DeleteReportSettingsDto } from './dtos/report-setting-delete.dto';
import { GetSettingsDto } from './dtos/report-setting-get.dto';
import { Logger } from 'core/logger/logger.service';

@Injectable()
export class ReportSettingsRepository {
    constructor(
        @InjectModel(ReportSettings.name) private readonly reportRepository: Model<ReportSettings>,
        private readonly logger: Logger
    ) { }

    public async getAllSettings(accountId: number, subdomain: string): Promise<ReportSettings[]> {
        try {
            return this.reportRepository.find({ account_id: accountId }).exec();
        } catch (err) {
            this.logger.error('Ошибка при получении всех настроек', err, subdomain);
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getSettingsByName(settingsInfo: GetSettingsDto): Promise<ReportSettings | null> {
        try {
            return this.reportRepository.findOne({ name: settingsInfo.name, account_id: settingsInfo.account_id }).exec();
        } catch (err) {
            this.logger.error('Ошибка при получении настроек по имени', err, settingsInfo.subdomain);
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // оставлю на случай, если для создания новго документа в базе не подойдёт вариант с объединением с обновлением.
    // async addSettings(reportSettings:ReportSettingsDto): Promise<ReportSettings | null> {
    //     return this._reportRepository.create(reportSettings);
    // }

    public async updateSettingsByName(reportSettings: ReportSettingsDto): Promise<ReportSettings> {
        try {
            return this.reportRepository.findOneAndUpdate({ name: reportSettings.name, account_id: reportSettings.account_id }, reportSettings, { upsert: true, new: true });
        } catch (err) {
            this.logger.error('Ошибка при обновлении или добавлении настроек ', err, reportSettings.subdomain);
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async deleteSettings(settingsInfo: DeleteReportSettingsDto): Promise<void> {
        try {
            this.reportRepository.deleteOne({ name: settingsInfo.name, account_id: settingsInfo.account_id }).exec();
        } catch (err) {
            this.logger.error('Ошибка при удалении настроек ', err, settingsInfo.subdomain);
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


}