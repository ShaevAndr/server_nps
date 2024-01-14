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
var CompanyProcessing_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyProcessing = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../../../core/logger/logger.service");
const company_repository_1 = require("../../repositiries/company.repository");
const amo_api_service_1 = require("../../../amo-api/amo-api.service");
const factory_1 = require("../../utils/factory");
let CompanyProcessing = CompanyProcessing_1 = class CompanyProcessing {
    constructor(logger, companyRepository, amoApi) {
        this.logger = logger;
        this.companyRepository = companyRepository;
        this.amoApi = amoApi;
    }
    async getCompany(accountId, companyId) {
        const loggerContext = `${CompanyProcessing_1.name}/${this.getCompany.name}`;
        this.logger.debug('Получении компании', loggerContext);
        const companyInBase = await this.companyRepository.findOne(accountId, companyId);
        if (!companyInBase) {
            const fetchCompany = await this.amoApi.getEntityInfo({ accountId }, companyId, 'companies');
            if (fetchCompany) {
                const newCompany = (0, factory_1.companyFactory)(accountId, companyId, fetchCompany.name);
                return await this.updateCompany(newCompany);
            }
        }
        return companyInBase;
    }
    async updateCompany(company) {
        const loggerContext = `${CompanyProcessing_1.name}/${this.updateCompany.name}`;
        this.logger.debug('Создание новой компании в базе или обновление', loggerContext, company.account_id);
        return await this.companyRepository.addOrUpdate(company);
    }
};
exports.CompanyProcessing = CompanyProcessing;
exports.CompanyProcessing = CompanyProcessing = CompanyProcessing_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.Logger,
        company_repository_1.CompanyRepository,
        amo_api_service_1.AmoApiService])
], CompanyProcessing);
//# sourceMappingURL=company.processing.js.map