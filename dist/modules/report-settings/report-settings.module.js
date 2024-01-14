"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSettingsModule = void 0;
const common_1 = require("@nestjs/common");
const report_settings_services_1 = require("./report-settings.services");
const report_settings_controller_1 = require("./report-settings.controller");
const logger_module_1 = require("../../core/logger/logger.module");
const mongoose_1 = require("@nestjs/mongoose");
const report_settings_model_1 = require("./models/report-settings.model");
const report_settings_repository_1 = require("./report-settings.repository");
let ReportSettingsModule = class ReportSettingsModule {
};
exports.ReportSettingsModule = ReportSettingsModule;
exports.ReportSettingsModule = ReportSettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: report_settings_model_1.ReportSettings.name, schema: report_settings_model_1.ReportSettingsSchema }]), logger_module_1.LoggerModule],
        controllers: [report_settings_controller_1.ReportSettingsController],
        providers: [report_settings_services_1.ReportSettingsService, report_settings_repository_1.ReportSettingsRepository],
        exports: [report_settings_services_1.ReportSettingsService, report_settings_repository_1.ReportSettingsRepository]
    })
], ReportSettingsModule);
//# sourceMappingURL=report-settings.module.js.map