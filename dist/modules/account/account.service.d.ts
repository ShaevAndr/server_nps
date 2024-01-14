import { AccountInstallDto } from './dtos';
import { PaidStatus } from 'types/paidStatus';
import { Account } from './entities';
import { Logger } from 'core/logger/logger.service';
import { AccountRepository } from './account.repository';
import { AmoApiService } from 'modules/amo-api/amo-api.service';
export declare class AccountService {
    private logger;
    private amoService;
    private dataServices;
    constructor(logger: Logger, amoService: AmoApiService, dataServices: AccountRepository);
    installWidget(installAccountDto: AccountInstallDto): Promise<Account>;
    uninstallWidget(accountId: string): Promise<Account>;
    getPaidStatus(accountId: string): Promise<PaidStatus>;
}
