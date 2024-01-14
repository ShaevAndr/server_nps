"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AccountService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../core/logger/logger.service");
const account_repository_1 = require("./account.repository");
const utils_1 = require("./utils/utils");
const jwt_decode_1 = require("jwt-decode");
const amo_api_service_1 = require("../amo-api/amo-api.service");
let AccountService = AccountService_1 = class AccountService {
    constructor(logger, amoService, dataServices) {
        this.logger = logger;
        this.amoService = amoService;
        this.dataServices = dataServices;
    }
    async installWidget(installAccountDto) {
        const loggerContext = `${AccountService_1.name}/${this.installWidget.name}`;
        const subdomain = (0, utils_1.getSubdomainFromRef)(installAccountDto.referer);
        try {
            const tokenData = await this.amoService.requestAccessToken(subdomain, installAccountDto.code);
            if (!tokenData) {
                this.logger.error('Failed to log in!', loggerContext, subdomain);
                throw new common_1.HttpException('Failed to log in!!', common_1.HttpStatus.UNAUTHORIZED);
            }
            const decodedToken = (0, jwt_decode_1.default)(tokenData.access_token);
            const accountId = decodedToken.account_id;
            if (!accountId) {
                this.logger.error('Failed to retrieve user information!', loggerContext, subdomain);
                throw new common_1.HttpException('Failed to retrieve user information!', common_1.HttpStatus.NOT_FOUND);
            }
            const accountInBase = await this.dataServices.getAccountById(accountId);
            if (accountInBase) {
                this.logger.info('Обновление пользователя', loggerContext, subdomain);
                return this.dataServices.updateAccountByID(accountId, { installed: true });
            }
            this.logger.info('Создание нового пользователя', loggerContext, subdomain);
            return this.dataServices.createAccount(subdomain, accountId, tokenData);
        }
        catch (err) {
            this.logger.error('Ошибка при регистрации пользователя', loggerContext, subdomain);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async uninstallWidget(accountId) {
        const loggerContext = `${AccountService_1.name}/${this.uninstallWidget.name}`;
        try {
            this.logger.info('Удаление пользователя', loggerContext, accountId);
            const account = await this.dataServices.updateAccountByID(Number(accountId), { installed: false });
            if (!account) {
                this.logger.error('Получение статуса пользователя, пользователь не найден', loggerContext, accountId);
                throw new common_1.HttpException('Failed to retrieve account information!', common_1.HttpStatus.NOT_FOUND);
            }
            return account;
        }
        catch (err) {
            this.logger.error('Ошибка при удалении пользователя', loggerContext, accountId);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getPaidStatus(accountId) {
        const loggerContext = `${AccountService_1.name}/${this.getPaidStatus.name}`;
        this.logger.info('Получение статуса пользователя', loggerContext, accountId);
        try {
            const account = await this.dataServices.getAccountById(Number(accountId));
            if (!account) {
                this.logger.error('Получение статуса пользователя, пользователь не найден', loggerContext, accountId);
                throw new common_1.HttpException('Failed to retrieve account information!', common_1.HttpStatus.NOT_FOUND);
            }
            return (0, utils_1.getStatus)(account);
        }
        catch (err) {
            this.logger.error('Получение статуса пользователя, ошибка сервера', loggerContext, accountId);
            throw new common_1.HttpException('Internal error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = AccountService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.Logger,
        amo_api_service_1.AmoApiService,
        account_repository_1.AccountRepository])
], AccountService);
//# sourceMappingURL=account.service.js.map