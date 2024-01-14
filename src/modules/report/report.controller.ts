import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { ModulesEndPoints, ReportEndpoints } from 'core/constants/endpoints';
import { ReportService } from './report.service';
import { ReportData } from './dto/reportData.dto';
import { Report } from './entity/report.entity';


@ApiTags('Получение сформированного отчёта.')
@Controller(ModulesEndPoints.Report)
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @ApiOperation({ summary: 'Добавление новых настроек отчёта' })
    @ApiResponse({ status: HttpStatusCode.Created })
    @Post(ReportEndpoints.GetReport)
    public async addNewSettings(@Body() reportInfo: ReportData): Promise<Report> {
        return await this.reportService.getReport(reportInfo);
    }
}

