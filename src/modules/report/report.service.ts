import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LeadsProcessing } from "modules/lead-hooks/business-logic/leads/leads-processing";
import { ReportSettingsService } from "modules/report-settings/report-settings.services";
import { ReportData } from "./dto/reportData.dto";
import { Report } from "./entity/report.entity";
import { findFromCustomFields, getClient, getEvaluationDate, getNPS, getResponsible } from "./utils/get-values";
import { leadInBase } from "./const/types/lead.type";
import { ReportLead } from "./entity/report-lead.entity";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { AccountLeadsDocument } from "modules/lead-hooks/models/account-leads.model";

@Injectable()
export class ReportService {
    constructor(
        private readonly leadService: LeadsProcessing,
        private readonly settingsService: ReportSettingsService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async getReport(reportData: ReportData): Promise<Report> {
        const cachedReport = await this.cacheManager.get(`${reportData.account_id}/${reportData.name}`) as Report
        if (cachedReport) {
            return cachedReport
        }

        let accountLeads = await this.getAccountLeads(reportData.account_id)

        const reportSettings = await this.settingsService.getSettings(reportData)
        if (!reportSettings) {
            throw new HttpException('Не найдены соответствующие настрйки', HttpStatus.NOT_ACCEPTABLE)
        }
        const leads = accountLeads.leads as undefined as leadInBase[]
        const report = new Report()
        report.reportName = reportData.name

        for (const lead of leads) {
            const leadReport = new ReportLead()
            leadReport.name = getClient(lead, reportSettings.Leads)
            leadReport.responsible = getResponsible(lead, reportSettings.Responsible)
            leadReport.stage = lead.pipeline
            leadReport.productGroup = findFromCustomFields(lead, reportSettings.ProductGroup) || '-'
            const date = getEvaluationDate(lead, reportSettings.EvaluationDate)
            leadReport.date = (date === '-' || (date === null)) ? '-' : Number(date) * 1000
            leadReport.nps = getNPS(lead, reportSettings.Nps)
            leadReport.npsScore = lead.NPS
            leadReport.comment = findFromCustomFields(lead, reportSettings.Comment) || '-'
            report.leads.push(leadReport)
        }
        await this.cacheManager.set(`${reportData.account_id}/${reportData.name}`, report, 300000)
        return report
    }

    private async getAccountLeads(accountId: number): Promise<AccountLeadsDocument> {
        const cachedLeads = await this.cacheManager.get(String(accountId)) as AccountLeadsDocument
        if (!cachedLeads) {
            const leadInBase = await this.leadService.getAllLeads(accountId)
            if (!leadInBase) {
                throw new HttpException('Не найдено сделок по id аккаунта', HttpStatus.NOT_ACCEPTABLE)
            }
            await this.cacheManager.set(String(accountId), leadInBase, 10000)
            return leadInBase
        }
        return cachedLeads
    }

}
