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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("axios");
const endpoints_1 = require("../../core/constants/endpoints");
const report_service_1 = require("./report.service");
const reportData_dto_1 = require("./dto/reportData.dto");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async addNewSettings(reportInfo) {
        return await this.reportService.getReport(reportInfo);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Добавление новых настроек отчёта' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Created }),
    (0, common_1.Post)(endpoints_1.ReportEndpoints.GetReport),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reportData_dto_1.ReportData]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "addNewSettings", null);
exports.ReportController = ReportController = __decorate([
    (0, swagger_1.ApiTags)('Получение сформированного отчёта.'),
    (0, common_1.Controller)(endpoints_1.ModulesEndPoints.Report),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map