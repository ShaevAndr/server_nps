import { Company, CompanyDocument } from '../models/company.model';
import { Model } from 'mongoose';
import { Logger } from 'core/logger/logger.service';
import { Company as CompanyEntity } from '../core/company.entity';
export declare class CompanyRepository {
    private readonly companyRepository;
    private readonly logger;
    constructor(companyRepository: Model<Company>, logger: Logger);
    findOne(accountId: number, companyId: number): Promise<CompanyDocument>;
    addOrUpdate(company: CompanyEntity): Promise<CompanyDocument>;
}
