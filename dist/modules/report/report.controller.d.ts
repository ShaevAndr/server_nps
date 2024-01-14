import { ReportService } from './report.service';
import { ReportData } from './dto/reportData.dto';
import { Report } from './entity/report.entity';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    addNewSettings(reportInfo: ReportData): Promise<Report>;
}
