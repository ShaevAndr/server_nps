import { ConfigService } from '@nestjs/config';
import { AccountRepository } from '../account/account.repository';
import { Logger } from '../../core/logger/logger.service';
import { AmoLead, AmoUser, TokensResponse } from './types/amo-api.types';
import { ApplicationConfigSchema } from 'core/config/app.schema';
import { RequestParams } from './decorators/get-all-page.decorator';
type DefaultRequestByAccount = {
    accountId: number;
    subdomain?: string;
};
export declare class AmoApiService {
    private readonly accountRepository;
    private readonly configService;
    private readonly logger;
    constructor(accountRepository: AccountRepository, configService: ConfigService<ApplicationConfigSchema>, logger: Logger);
    private createRequestUrl;
    private getAccountInfo;
    requestAccessToken(subdomain: string, code: string): Promise<TokensResponse>;
    refreshAccessToken(subdomain: string, refreshToken: string): Promise<TokensResponse>;
    getUser({ accountId, subdomain }: DefaultRequestByAccount, userId: number, params?: RequestParams): Promise<AmoUser>;
    getLeadInfo({ accountId, subdomain }: DefaultRequestByAccount, leadId: number): Promise<AmoLead>;
    getAllLeads({ accountId, subdomain }: DefaultRequestByAccount, params: RequestParams): Promise<AmoLead[]>;
    getEntityInfo<T>({ accountId, subdomain }: DefaultRequestByAccount, entityId: number, entityType: 'contacts' | 'companies' | 'leads/pipelines'): Promise<T>;
}
export {};
