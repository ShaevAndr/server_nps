import { Logger } from "core/logger/logger.service";
import { LeadsRepository } from "modules/lead-hooks/lead.repository";
import { FieldsServices } from "modules/custom-fields/fields.services";
import { CompanyServices } from "modules/company/company.services";
import { ContactServices } from "modules/contact/contact.services";
import { ResponsibleServices } from "modules/resonsible/responsible.services";
import { AmoApiService } from "modules/amo-api/amo-api.service";
import { LeadsDto } from "modules/lead-hooks/dtos/delete-lead-hook.dto";
import { AccountLeadsDocument } from "modules/lead-hooks/models/account-leads.model";
export declare class LeadsProcessing {
    private logger;
    private leadsRepository;
    private fieldServices;
    private companyServices;
    private contactServices;
    private responsibleServices;
    private amoApi;
    constructor(logger: Logger, leadsRepository: LeadsRepository, fieldServices: FieldsServices, companyServices: CompanyServices, contactServices: ContactServices, responsibleServices: ResponsibleServices, amoApi: AmoApiService);
    getAllLeads(accountId: number): Promise<AccountLeadsDocument>;
    updateLead(subdomain: string, accountId: number, leadId: number): Promise<void>;
    private addOrUpdateLeadInBase;
    deleteAllLeads(accountId: number): Promise<void>;
    deleteLeadById(accountId: number, leads: LeadsDto): Promise<void>;
    addAllLeads(accountId: number, subdomain: string): Promise<void>;
}
