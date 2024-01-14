import { Injectable } from "@nestjs/common";
import { Logger } from "core/logger/logger.service";
import { CompanyDocument } from '../../models/company.model'
import { CompanyRepository } from "modules/lead-hooks/repositiries/company.repository";
import { AmoApiService } from "modules/amo-api/amo-api.service";
import { Company } from "modules/lead-hooks/core/company.entity";
import { AmoCompany } from "modules/amo-api/types/amo-api.types";
import { companyFactory } from "modules/lead-hooks/utils/factory";

@Injectable()
export class CompanyProcessing {
    constructor(
        private logger: Logger,
        private companyRepository: CompanyRepository,
        private amoApi: AmoApiService
    ) { }

    async getCompany(accountId: number, companyId: number): Promise<CompanyDocument> {
        const loggerContext = `${CompanyProcessing.name}/${this.getCompany.name}`;
        this.logger.debug('Получении компании', loggerContext)
        const companyInBase = await this.companyRepository.findOne(accountId, companyId)
        if (!companyInBase) {
            const fetchCompany = await this.amoApi.getEntityInfo<AmoCompany>({ accountId }, companyId, 'companies')
            if (fetchCompany) {
                const newCompany = companyFactory(accountId, companyId, fetchCompany.name)
                return await this.updateCompany(newCompany)
            }
        }
        return companyInBase
    }

    async updateCompany(company: Company): Promise<CompanyDocument> {
        const loggerContext = `${CompanyProcessing.name}/${this.updateCompany.name}`;
        this.logger.debug('Создание новой компании в базе или обновление', loggerContext, company.account_id)
        return await this.companyRepository.addOrUpdate(company)
    }
}