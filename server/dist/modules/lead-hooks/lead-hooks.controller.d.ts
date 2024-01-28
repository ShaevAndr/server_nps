import { LeadHookService } from './lead-hooks.services';
import { AccountDto } from './dtos/hook.dto';
import { UpdateHookDto } from './dtos/update-hook.dto';
import { DeleteHookDto } from './dtos/delete-lead-hook.dto';
export declare class LeadsHooksController {
    private readonly leadHooksService;
    constructor(leadHooksService: LeadHookService);
    updateLead(hook: UpdateHookDto): Promise<void>;
    deleteLead(hook: DeleteHookDto): Promise<void>;
    addAllLeads(account: AccountDto): Promise<void>;
    deleteAllLeads(account: AccountDto): Promise<void>;
}
