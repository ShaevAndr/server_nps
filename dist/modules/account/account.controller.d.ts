import { AccountService } from './account.service';
import { PaymentStatusQueryDto, AccountInstallDto, AccountUninstallDto } from './dtos';
import { Account } from './entities/account.entities';
import { PaidStatus } from 'types/paidStatus';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    install(widgetAccountInfo: AccountInstallDto): Promise<Account>;
    unInstall(widgetAccountInfo: AccountUninstallDto): Promise<Account>;
    status(query: PaymentStatusQueryDto): Promise<PaidStatus>;
}
