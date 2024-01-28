import { Logger } from 'core/logger/logger.service';
import { LeadsProcessing } from './business-logic/leads-processing';
import { ContactServices } from '../contact/contact.services';
import { CompanyServices } from '../company/company.services';
import { UpdateHookDto } from './dtos/update-hook.dto';
import { DeleteHookDto } from './dtos/delete-lead-hook.dto';
export declare class LeadHookService {
    private logger;
    private leadsServices;
    private contactServices;
    private companyServices;
    constructor(logger: Logger, leadsServices: LeadsProcessing, contactServices: ContactServices, companyServices: CompanyServices);
    updateEntity(hook: UpdateHookDto): Promise<void>;
    deleteLead(hook: DeleteHookDto): Promise<void>;
    deleteAllLeads(accountId: number): Promise<void>;
    fetchAllLeads(accountId: number, subdomain: string): Promise<void>;
}
