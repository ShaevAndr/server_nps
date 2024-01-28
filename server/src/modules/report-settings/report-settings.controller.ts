import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReportSettingsService } from './report-settings.services';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModulesEndPoints, ReportSettingsEndpoints } from 'core/constants/endpoints';
import { HttpStatusCode } from 'axios';
import { ReportSettingsDto } from './dtos/report-settings.dto';
import { DeleteReportSettingsDto } from './dtos/report-setting-delete.dto';
import { GetSettingsDto } from './dtos/report-setting-get.dto';
import { ReportSettings } from './models/report-settings.model';
import { AccountDto } from './dtos/account.dto';

@ApiTags('Работа с настройками отображения отчёта')
@Controller(ModulesEndPoints.ReportSettings)
export class ReportSettingsController {
    constructor(private readonly reportService: ReportSettingsService) { }

    @ApiOperation({ summary: 'Добавление новых настроек отчёта' })
    @ApiResponse({ status: HttpStatusCode.Created })
    @Post(ReportSettingsEndpoints.Add)
    public async addNewSettings(@Body() newSettings: ReportSettingsDto): Promise<ReportSettings> {
        return this.reportService.addNewSettings(newSettings);
    }

    @ApiOperation({ summary: 'Удаления настроек отчёта' })
    @ApiResponse({ status: HttpStatusCode.NoContent })
    @Post(ReportSettingsEndpoints.Delete)
    public async deleteSettings(@Body() settingsIdentificator: DeleteReportSettingsDto): Promise<void> {
        return this.reportService.deleteSetings(settingsIdentificator);
    }


    @ApiOperation({ summary: 'Обновление одной настройки для отчёта' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post(ReportSettingsEndpoints.Update)
    public async updateSettings(@Body() newSettings: ReportSettingsDto): Promise<ReportSettings> {
        return this.reportService.changeSetings(newSettings);
    }

    @ApiOperation({ summary: 'Получение всех настроек для отчёта' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post(ReportSettingsEndpoints.GetAll)
    public async getAllSettings(@Body() account: AccountDto): Promise<ReportSettings[]> {
        return this.reportService.getAllSettings(account);
    }

    @ApiOperation({ summary: 'Получение настройки по имени' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post(ReportSettingsEndpoints.GetByName)
    public async getSettingsByName(@Body() settingsIdentificator: GetSettingsDto): Promise<ReportSettings> {
        return this.reportService.getSettings(settingsIdentificator);
    }
}
