import { AccountService } from './account.service';
import { PaymentStatusQueryDto, AccountInstallDto, AccountUninstallDto } from './dtos';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    install(widgetAccountInfo: AccountInstallDto): Promise<import("./entities").Account>;
    unInstall(widgetAccountInfo: AccountUninstallDto): Promise<import("./entities").Account>;
    status(query: PaymentStatusQueryDto): Promise<import("../../types/paidStatus").PaidStatus>;
}
