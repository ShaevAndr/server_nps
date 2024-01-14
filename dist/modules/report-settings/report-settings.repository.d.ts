import { ReportSettings } from './models/report-settings.model';
import { Model } from 'mongoose';
import { ReportSettingsDto } from './dto/report-settings.dto';
import { DeleteReportSettingsDto } from './dto/report-setting-delete.dto';
import { GetSettingsDto } from './dto/report-setting-get.dto';
import { Logger } from 'core/logger/logger.service';
export declare class ReportSettingsRepository {
    private readonly reportRepository;
    private readonly logger;
    constructor(reportRepository: Model<ReportSettings>, logger: Logger);
    getAllSettings(accountId: number, subdomain: string): Promise<ReportSettings[]>;
    getSettingsByName(settingsInfo: GetSettingsDto): Promise<ReportSettings | null>;
    updateSettingsByName(reportSettings: ReportSettingsDto): Promise<ReportSettings>;
    deleteSettings(settingsInfo: DeleteReportSettingsDto): Promise<void>;
}
