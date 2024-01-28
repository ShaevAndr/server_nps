import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountInstallDto } from './dtos';
import { PaidStatus } from 'types/paidStatus';
import { Account } from './entities'
import { Logger } from 'core/logger/logger.service';
import { AccountRepository } from './account.repository';
import { getStatus, getSubdomainFromRef } from './utils/utils';
import jwt_decode from 'jwt-decode';
import { DecodedAmoAccessTokenTypes } from './types/decoded-amo-access-token.types';
import { AmoApiService } from 'modules/amo-api/amo-api.service';

@Injectable()
export class AccountService {
    constructor(
        private logger: Logger,
        private amoService: AmoApiService,
        private dataServices: AccountRepository,

    ) { }

    public async installWidget(installAccountDto: AccountInstallDto): Promise<Account> {
        const loggerContext = `${AccountService.name}/${this.installWidget.name}`;
        const subdomain = getSubdomainFromRef(installAccountDto.referer)
        try {
            const tokenData = await this.amoService.requestAccessToken(subdomain, installAccountDto.code);
            if (!tokenData) {
                this.logger.error('Ошибка авторизации', loggerContext, subdomain);
                throw new HttpException('Failed to log in!!', HttpStatus.UNAUTHORIZED);
            }

            const decodedToken: DecodedAmoAccessTokenTypes = jwt_decode(tokenData.access_token);
            const accountId = decodedToken.account_id;
            if (!accountId) {
                this.logger.error('Не удалось получить информацию о пользователе', loggerContext, subdomain);
                throw new HttpException('Failed to retrieve user information!', HttpStatus.NOT_FOUND);
            }


            const accountInBase = await this.dataServices.getAccountById(accountId)
            if (accountInBase) {
                this.logger.info('Обновление пользователя', loggerContext, subdomain)

                return this.dataServices.updateAccountByID(accountId, { installed: true })
            }

            this.logger.info('Создание нового пользователя', loggerContext, subdomain)

            return this.dataServices.createAccount(subdomain, accountId, tokenData);
        } catch (err) {
            this.logger.error('Ошибка при регистрации пользователя', loggerContext, subdomain)
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async uninstallWidget(accountId: string): Promise<Account> {
        const loggerContext = `${AccountService.name}/${this.uninstallWidget.name}`;
        try {
            this.logger.info('Удаление пользователя', loggerContext, accountId)
            const account = await this.dataServices.updateAccountByID(Number(accountId), { installed: false })
            if (!account) {
                this.logger.error('Получение статуса пользователя, пользователь не найден', loggerContext, accountId)
                throw new HttpException('Failed to retrieve account information!', HttpStatus.NOT_FOUND)
            }
            return account
        } catch (err) {
            this.logger.error('Ошибка при удалении пользователя', loggerContext, accountId)
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getPaidStatus(accountId: string): Promise<PaidStatus> {
        const loggerContext = `${AccountService.name}/${this.getPaidStatus.name}`;
        this.logger.info('Получение статуса пользователя', loggerContext, accountId)
        try {
            const account = await this.dataServices.getAccountById(Number(accountId));
            if (!account) {
                this.logger.error('Получение статуса пользователя, пользователь не найден', loggerContext, accountId)
                throw new HttpException('Failed to retrieve account information!', HttpStatus.NOT_FOUND)
            }
            return getStatus(account)
        } catch (err) {
            this.logger.error('Получение статуса пользователя, ошибка сервера', loggerContext, accountId)
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}