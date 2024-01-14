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
exports.ReportSettingsController = void 0;
const common_1 = require("@nestjs/common");
const report_settings_services_1 = require("./report-settings.services");
const swagger_1 = require("@nestjs/swagger");
const endpoints_1 = require("../../core/constants/endpoints");
const axios_1 = require("axios");
const report_settings_dto_1 = require("./dto/report-settings.dto");
const report_setting_delete_dto_1 = require("./dto/report-setting-delete.dto");
const report_setting_get_dto_1 = require("./dto/report-setting-get.dto");
const account_dto_1 = require("./dto/account.dto");
let ReportSettingsController = class ReportSettingsController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async addNewSettings(newSettings) {
        return this.reportService.addNewSettings(newSettings);
    }
    async deleteSettings(settingsIdentificator) {
        return this.reportService.deleteSetings(settingsIdentificator);
    }
    async updateSettings(newSettings) {
        return this.reportService.changeSetings(newSettings);
    }
    async getAllSettings(account) {
        return this.reportService.getAllSettings(account);
    }
    async getSettingsByName(settingsIdentificator) {
        return this.reportService.getSettings(settingsIdentificator);
    }
};
exports.ReportSettingsController = ReportSettingsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Добавление новых настроек отчёта' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Created }),
    (0, common_1.Post)(endpoints_1.ReportSettingsEndpoints.Add),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_settings_dto_1.ReportSettingsDto]),
    __metadata("design:returntype", Promise)
], ReportSettingsController.prototype, "addNewSettings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаления настроек отчёта' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.NoContent }),
    (0, common_1.Post)(endpoints_1.ReportSettingsEndpoints.Delete),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_setting_delete_dto_1.DeleteReportSettingsDto]),
    __metadata("design:returntype", Promise)
], ReportSettingsController.prototype, "deleteSettings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление одной настройки для отчёта' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Ok }),
    (0, common_1.Post)(endpoints_1.ReportSettingsEndpoints.Update),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_settings_dto_1.ReportSettingsDto]),
    __metadata("design:returntype", Promise)
], ReportSettingsController.prototype, "updateSettings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех настроек для отчёта' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Ok }),
    (0, common_1.Post)(endpoints_1.ReportSettingsEndpoints.GetAll),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.AccountDto]),
    __metadata("design:returntype", Promise)
], ReportSettingsController.prototype, "getAllSettings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение настройки по имени' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Ok }),
    (0, common_1.Post)(endpoints_1.ReportSettingsEndpoints.GetByName),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_setting_get_dto_1.GetSettingsDto]),
    __metadata("design:returntype", Promise)
], ReportSettingsController.prototype, "getSettingsByName", null);
exports.ReportSettingsController = ReportSettingsController = __decorate([
    (0, swagger_1.ApiTags)('Работа с настройками отображения отчёта'),
    (0, common_1.Controller)(endpoints_1.ModulesEndPoints.ReportSettings),
    __metadata("design:paramtypes", [report_settings_services_1.ReportSettingsService])
], ReportSettingsController);
//# sourceMappingURL=report-settings.controller.js.map