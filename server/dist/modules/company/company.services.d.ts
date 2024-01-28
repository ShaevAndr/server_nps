import { Logger } from "core/logger/logger.service";
import { CompanyDocument } from './models/company.model';
import { CompanyRepository } from "modules/company/company.repository";
import { AmoApiService } from "modules/amo-api/amo-api.service";
import { Company } from "modules/company/core/company.entity";
export declare class CompanyServices {
    private logger;
    private companyRepository;
    private amoApi;
    constructor(logger: Logger, companyRepository: CompanyRepository, amoApi: AmoApiService);
    getCompany(accountId: number, companyId: number): Promise<CompanyDocument>;
    updateCompany(company: Company): Promise<CompanyDocument>;
}
