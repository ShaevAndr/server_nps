"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesModule = void 0;
const common_1 = require("@nestjs/common");
const logger_module_1 = require("../../core/logger/logger.module");
const mongoose_1 = require("@nestjs/mongoose");
const company_services_1 = require("./company.services");
const company_repository_1 = require("./company.repository");
const company_model_1 = require("./models/company.model");
const amo_api_module_1 = require("../amo-api/amo-api.module");
let CompaniesModule = class CompaniesModule {
};
exports.CompaniesModule = CompaniesModule;
exports.CompaniesModule = CompaniesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            amo_api_module_1.AmoApiModule,
            mongoose_1.MongooseModule.forFeature([{ name: company_model_1.Company.name, schema: company_model_1.CompanySchema }]),
            logger_module_1.LoggerModule
        ],
        providers: [
            company_repository_1.CompanyRepository,
            company_services_1.CompanyServices,
        ],
        exports: [company_services_1.CompanyServices]
    })
], CompaniesModule);
//# sourceMappingURL=company.module.js.map