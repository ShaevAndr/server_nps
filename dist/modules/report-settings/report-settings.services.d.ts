import { ReportSettingsDto } from './dto/report-settings.dto';
import { Logger } from 'core/logger/logger.service';
import { ReportSettingsRepository } from './report-settings.repository';
import { ReportSettings } from './models/report-settings.model';
import { DeleteReportSettingsDto } from './dto/report-setting-delete.dto';
import { GetSettingsDto } from './dto/report-setting-get.dto';
import { AccountDto } from './dto/account.dto';
export declare class ReportSettingsService {
    private logger;
    private reportSettingsRepository;
    constructor(logger: Logger, reportSettingsRepository: ReportSettingsRepository);
    addNewSettings(newSettings: ReportSettingsDto): Promise<ReportSettings>;
    changeSetings(newSettings: ReportSettingsDto): Promise<ReportSettings>;
    deleteSetings(settingIdentificator: DeleteReportSettingsDto): Promise<void>;
    getSettings(settingIdentificator: GetSettingsDto): Promise<ReportSettings>;
    getAllSettings(account: AccountDto): Promise<ReportSettings[]>;
}
