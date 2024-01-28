import { ReportLead } from "./report-lead.entity"

export class Report {
    reportName: string
    leads: ReportLead[] = []
}