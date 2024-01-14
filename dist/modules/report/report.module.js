"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const lead_hooks_module_1 = require("../lead-hooks/lead-hooks.module");
const report_controller_1 = require("./report.controller");
const report_service_1 = require("./report.service");
const leads_processing_1 = require("../lead-hooks/business-logic/leads/leads-processing");
const report_settings_services_1 = require("../report-settings/report-settings.services");
const amo_api_service_1 = require("../amo-api/amo-api.service");
const logger_service_1 = require("../../core/logger/logger.service");
const report_settings_module_1 = require("../report-settings/report-settings.module");
const account_module_1 = require("../account/account.module");
const cache_manager_1 = require("@nestjs/cache-manager");
let ReportModule = class ReportModule {
};
exports.ReportModule = ReportModule;
exports.ReportModule = ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [lead_hooks_module_1.LeadHooksModule, report_settings_module_1.ReportSettingsModule, account_module_1.AccountModule, cache_manager_1.CacheModule.register()],
        controllers: [report_controller_1.ReportController],
        providers: [report_service_1.ReportService,
            leads_processing_1.LeadsProcessing,
            report_settings_services_1.ReportSettingsService,
            logger_service_1.Logger,
            amo_api_service_1.AmoApiService
        ]
    })
], ReportModule);
//# sourceMappingURL=report.module.js.map