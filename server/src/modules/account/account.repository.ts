import { Injectable } from '@nestjs/common';
import { AccountDocument, Account as AccountModel } from './models/account.models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './entities';
import { SuccessTokenResponse, TokenPairsType } from 'modules/amo-api/types/token.type';

@Injectable()
export class AccountRepository {
    constructor(
        @InjectModel(AccountModel.name) private readonly _accountRepository: Model<AccountModel>,
    ) { }

    public async getAccountById(accountId: number): Promise<AccountDocument | null> {
        const account = await this._accountRepository.findOne({ accountId: accountId }).exec();
        return account
    }

    public async createAccount(subdomain: string, accountId: number, tokens: SuccessTokenResponse): Promise<Account | null> {
        const newAccount = {
            subdomain,
            accountId,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token
        }
        const account = await this._accountRepository.create(newAccount);
        return account ? account.toObject() : null;
    }

    public async updateAccountByID(accountId: number, updatedClient: Partial<Account>): Promise<Account | null> {
        const account = await this._accountRepository.findOneAndUpdate({ accountId }, updatedClient);
        return account ? account.toObject() : null
    }
}