import { AccountDocument, Account as AccountModel } from './models/account.models';
import { Model } from 'mongoose';
import { Account } from './entities';
import { SuccessTokenResponse } from 'modules/amo-api/types/token.type';
export declare class AccountRepository {
    private readonly _accountRepository;
    constructor(_accountRepository: Model<AccountModel>);
    getAccountById(accountId: number): Promise<AccountDocument | null>;
    createAccount(subdomain: string, accountId: number, tokens: SuccessTokenResponse): Promise<Account | null>;
    updateAccountByID(accountId: number, updatedClient: Partial<Account>): Promise<Account | null>;
}
