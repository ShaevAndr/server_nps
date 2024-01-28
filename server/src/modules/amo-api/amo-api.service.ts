import * as querystring from 'node:querystring';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AccountRepository } from '../account/account.repository';
import { Logger } from '../../core/logger/logger.service';
import { AuthTypes } from './constants/auth-types';
import {
    AmoLead,
    AmoUser,
    TokensResponse,
} from './types/amo-api.types';
import { UseTokenAuthorization } from './decorators/use-token-authorization.decorator';
import { ApplicationConfigSchema } from 'core/config/app.schema';
import { GetAllPage, RequestParams } from './decorators/get-all-page.decorator';
import handleError from 'core/helpers/handleError';
import { AccountDocument } from 'modules/account/models/account.models';


type DefaultRequestByAccount = {
    accountId: number;
    subdomain?: string;
};

@Injectable()
export class AmoApiService {
    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly configService: ConfigService<ApplicationConfigSchema>,
        private readonly logger: Logger
    ) { }

    private createRequestUrl(subdomain: string, endpoint: string, params?: RequestParams): string {
        return `https://${subdomain}.amocrm.ru/api/v4/${endpoint}` + `${params ? '?' + querystring.stringify(params) : ''}`;
    }

    private async getAccountInfo(accountId: number, subdomain: string): Promise<AccountDocument> {
        const loggerContext = `${AmoApiService.name}/${this.getAccountInfo.name}`;

        try {
            if (!accountId) {
                this.logger.error(`Нет Id аккаунта`, loggerContext);
                new HttpException(`accessToken or accountId not found`, HttpStatus.BAD_REQUEST);
            }

            const accountInfo = await this.accountRepository.getAccountById(accountId);

            if (!accountInfo) {
                this.logger.error(`Аккаунт с id => ${accountId}, не найден`, loggerContext);
                new HttpException(`Account with id => ${accountId}, not found!`, HttpStatus.NOT_FOUND);
            }

            if (accountInfo.subdomain !== subdomain) {
                accountInfo.subdomain = subdomain;
                await this.accountRepository.updateAccountByID(accountId, { subdomain });
            }
            return accountInfo;
        } catch (error) {
            const message = `Error while getting account info`;
            this.logger.error(error, loggerContext);
            handleError(error, message);
        }
    }

    public async requestAccessToken(subdomain: string, code: string): Promise<TokensResponse> {
        const loggerContext = `${AmoApiService.name}/${this.requestAccessToken.name}`;

        try {
            const { data: tokens } = await axios.post<TokensResponse>(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
                client_id: this.configService.get('CLIENT_UUID'),
                client_secret: this.configService.get('CLIENT_SECRET'),
                grant_type: AuthTypes.Auth,
                redirect_uri: this.configService.get('REDIRECT_URI'),
                code,
            });

            return tokens;
        } catch (error) {
            const message = `Ошибка получения токена`;
            this.logger.error(error, loggerContext);
            handleError(error, message);
        }
    }

    public async refreshAccessToken(subdomain: string, refreshToken: string): Promise<TokensResponse> {
        const loggerContext = `${AmoApiService.name}/${this.refreshAccessToken.name}`;

        try {
            const { data: tokens } = await axios.post<TokensResponse>(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
                client_id: this.configService.get('CLIENT_UUID'),
                client_secret: this.configService.get('CLIENT_SECRET'),
                grant_type: AuthTypes.Refresh,
                refresh_token: refreshToken,
            });

            return tokens;
        } catch (error) {
            this.logger.error(error, loggerContext);
        }
    }

    @UseTokenAuthorization()
    public async getUser({ accountId, subdomain }: DefaultRequestByAccount, userId: number, params?: RequestParams): Promise<AmoUser> {
        const account = await this.getAccountInfo(accountId, subdomain);
        const url = this.createRequestUrl(subdomain, 'users', params);
        return axios
            .get<AmoUser>(`${url}/${userId}`, {
                headers: {
                    Authorization: `Bearer ${account.accessToken}`,
                },
            })
            .then((res) => res.data);
    }

    @UseTokenAuthorization()
    public async getLeadInfo({ accountId, subdomain }: DefaultRequestByAccount, leadId: number): Promise<AmoLead> {
        const account = await this.accountRepository.getAccountById(accountId);

        if (!account) {
            throw new Error('Account not found');
        }

        const url = this.createRequestUrl(account.subdomain, `leads/${leadId}`, { with: 'contacts' });
        console.log(url)
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });

        if (res.status === HttpStatus.NO_CONTENT) {
            return null;
        }
        return res.data;
    }

    @GetAllPage
    @UseTokenAuthorization()
    public async getAllLeads({ accountId, subdomain }: DefaultRequestByAccount, params: RequestParams): Promise<AmoLead[]> {
        const account = await this.accountRepository.getAccountById(accountId);

        if (!account) {
            throw new Error('Account not found');
        }

        const url = this.createRequestUrl(account.subdomain, `leads`, params);
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });

        if (res.status === HttpStatus.NO_CONTENT) {
            return null;
        }

        return res.data._embedded.leads;
    }

    @UseTokenAuthorization()
    public async getEntityInfo<T>({ accountId, subdomain }: DefaultRequestByAccount, entityId: number, entityType: 'contacts' | 'companies' | 'leads/pipelines'): Promise<T> {
        const account = await this.accountRepository.getAccountById(accountId);

        if (!account) {
            throw new Error('Account not found');
        }

        const url = this.createRequestUrl(account.subdomain, `${entityType}/${entityId}`);
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });

        if (res.status === HttpStatus.NO_CONTENT) {
            return null;
        }

        return res.data;
    }
}
