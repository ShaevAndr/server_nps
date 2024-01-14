import { Logger } from "core/logger/logger.service";
import { LeadsRepository } from "modules/lead-hooks/repositiries/lead.repository";
import { FieldsProcessing } from "../fields/fields-processing";
import { CompanyProcessing } from "../company/company.processing";
import { ContactProcessing } from "../contact/contact.processing";
import { ResponsibleProcessing } from "../responsible/responsible.processing";
import { AmoApiService } from "modules/amo-api/amo-api.service";
import { LeadsDto } from "modules/lead-hooks/dtos/delete-lead-hook.dto";
import { AccountLeadsDocument } from "modules/lead-hooks/models/account-leads.model";
export declare class LeadsProcessing {
    private logger;
    private leadsRepository;
    private fieldProcessing;
    private companyProcessing;
    private contactProcessing;
    private responsibleProcessing;
    private amoApi;
    constructor(logger: Logger, leadsRepository: LeadsRepository, fieldProcessing: FieldsProcessing, companyProcessing: CompanyProcessing, contactProcessing: ContactProcessing, responsibleProcessing: ResponsibleProcessing, amoApi: AmoApiService);
    getAllLeads(accountId: number): Promise<AccountLeadsDocument>;
    updateLead(subdomain: string, accountId: number, leadId: number): Promise<void>;
    private addOrUpdateLeadInBase;
    deleteAllLeads(accountId: number): Promise<void>;
    deleteLeadById(accountId: number, leads: LeadsDto): Promise<void>;
    addAllLeads(accountId: number, subdomain: string): Promise<void>;
}
