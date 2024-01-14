import { ReportSettingsService } from './report-settings.services';
import { ReportSettingsDto } from './dto/report-settings.dto';
import { DeleteReportSettingsDto } from './dto/report-setting-delete.dto';
import { GetSettingsDto } from './dto/report-setting-get.dto';
import { ReportSettings } from './models/report-settings.model';
import { AccountDto } from './dto/account.dto';
export declare class ReportSettingsController {
    private readonly reportService;
    constructor(reportService: ReportSettingsService);
    addNewSettings(newSettings: ReportSettingsDto): Promise<ReportSettings>;
    deleteSettings(settingsIdentificator: DeleteReportSettingsDto): Promise<void>;
    updateSettings(newSettings: ReportSettingsDto): Promise<ReportSettings>;
    getAllSettings(account: AccountDto): Promise<ReportSettings[]>;
    getSettingsByName(settingsIdentificator: GetSettingsDto): Promise<ReportSettings>;
}
