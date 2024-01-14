import { Logger } from 'core/logger/logger.service';
import { LeadsProcessing } from './business-logic/leads/leads-processing';
import { ContactProcessing } from './business-logic/contact/contact.processing';
import { CompanyProcessing } from './business-logic/company/company.processing';
import { UpdateHookDto } from './dtos/update-hook.dto';
import { DeleteHookDto } from './dtos/delete-lead-hook.dto';
export declare class LeadHookService {
    private logger;
    private leadsServices;
    private contactServices;
    private companyServices;
    constructor(logger: Logger, leadsServices: LeadsProcessing, contactServices: ContactProcessing, companyServices: CompanyProcessing);
    updateEntity(hook: UpdateHookDto): Promise<void>;
    deleteLead(hook: DeleteHookDto): Promise<void>;
    deleteAllLeads(accountId: number): Promise<void>;
    fetchAllLeads(accountId: number, subdomain: string): Promise<void>;
}
