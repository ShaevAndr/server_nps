import { LeadsProcessing } from "modules/lead-hooks/business-logic/leads/leads-processing";
import { ReportSettingsService } from "modules/report-settings/report-settings.services";
import { ReportData } from "./dto/reportData.dto";
import { Report } from "./entity/report.entity";
import { Cache } from "cache-manager";
export declare class ReportService {
    private readonly leadService;
    private readonly settingsService;
    private cacheManager;
    constructor(leadService: LeadsProcessing, settingsService: ReportSettingsService, cacheManager: Cache);
    getReport(reportData: ReportData): Promise<Report>;
    private getAccountLeads;
}
