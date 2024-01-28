import { AccountLeadsDocument, AccountLeads } from './models/account-leads.model';
import { LeadDocument, Lead as LeadModel } from './models/lead.models';
import { Model } from 'mongoose';
import { Logger } from 'core/logger/logger.service';
import { Lead } from './core/lead.entity';
export declare class LeadsRepository {
    private readonly accountLeadsRepository;
    private readonly leadsRepository;
    private readonly logger;
    constructor(accountLeadsRepository: Model<AccountLeads>, leadsRepository: Model<LeadModel>, logger: Logger);
    private initNewAccount;
    addOrUpdateLead(accountId: number, subdomain: string, lead: Lead): Promise<void>;
    getLeadById(accountId: number, leadId: number): Promise<LeadDocument>;
    deleteLeadById(accountId: number, leadId: number): Promise<void>;
    deleteAllLeads(accountId: number): Promise<void>;
    getAllLeads(accountId: number): Promise<AccountLeadsDocument>;
}
