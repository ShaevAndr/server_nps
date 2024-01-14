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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const leads_processing_1 = require("../lead-hooks/business-logic/leads/leads-processing");
const report_settings_services_1 = require("../report-settings/report-settings.services");
const report_entity_1 = require("./entity/report.entity");
const get_values_1 = require("./utils/get-values");
const report_lead_entity_1 = require("./entity/report-lead.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
let ReportService = class ReportService {
    constructor(leadService, settingsService, cacheManager) {
        this.leadService = leadService;
        this.settingsService = settingsService;
        this.cacheManager = cacheManager;
    }
    async getReport(reportData) {
        const cachedReport = await this.cacheManager.get(`${reportData.account_id}/${reportData.name}`);
        if (cachedReport) {
            return cachedReport;
        }
        let accountLeads = await this.getAccountLeads(reportData.account_id);
        const reportSettings = await this.settingsService.getSettings(reportData);
        if (!reportSettings) {
            throw new common_1.HttpException('Не найдены соответствующие настрйки', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const leads = accountLeads.leads;
        const report = new report_entity_1.Report();
        report.reportName = reportData.name;
        for (const lead of leads) {
            const leadReport = new report_lead_entity_1.ReportLead();
            leadReport.name = (0, get_values_1.getClient)(lead, reportSettings.Leads);
            leadReport.responsible = (0, get_values_1.getResponsible)(lead, reportSettings.Responsible);
            leadReport.stage = lead.pipeline;
            leadReport.productGroup = (0, get_values_1.findFromCustomFields)(lead, reportSettings.ProductGroup) || '-';
            const date = (0, get_values_1.getEvaluationDate)(lead, reportSettings.EvaluationDate);
            leadReport.date = (date === '-' || (date === null)) ? '-' : Number(date) * 1000;
            leadReport.nps = (0, get_values_1.getNPS)(lead, reportSettings.Nps);
            leadReport.npsScore = lead.NPS;
            leadReport.comment = (0, get_values_1.findFromCustomFields)(lead, reportSettings.Comment) || '-';
            report.leads.push(leadReport);
        }
        await this.cacheManager.set(`${reportData.account_id}/${reportData.name}`, report, 300000);
        return report;
    }
    async getAccountLeads(accountId) {
        const cachedLeads = await this.cacheManager.get(String(accountId));
        if (!cachedLeads) {
            const leadInBase = await this.leadService.getAllLeads(accountId);
            if (!leadInBase) {
                throw new common_1.HttpException('Не найдено сделок по id аккаунта', common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            await this.cacheManager.set(String(accountId), leadInBase, 10000);
            return leadInBase;
        }
        return cachedLeads;
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [leads_processing_1.LeadsProcessing,
        report_settings_services_1.ReportSettingsService, Object])
], ReportService);
//# sourceMappingURL=report.service.js.map