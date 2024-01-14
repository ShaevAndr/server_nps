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
var AmoApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmoApiService = void 0;
const querystring = require("node:querystring");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const account_repository_1 = require("../account/account.repository");
const logger_service_1 = require("../../core/logger/logger.service");
const auth_types_1 = require("./constants/auth-types");
const use_token_authorization_decorator_1 = require("./decorators/use-token-authorization.decorator");
const get_all_page_decorator_1 = require("./decorators/get-all-page.decorator");
const handleError_1 = require("../../core/helpers/handleError");
let AmoApiService = AmoApiService_1 = class AmoApiService {
    constructor(accountRepository, configService, logger) {
        this.accountRepository = accountRepository;
        this.configService = configService;
        this.logger = logger;
    }
    createRequestUrl(subdomain, endpoint, params) {
        return `https://${subdomain}.amocrm.ru/api/v4/${endpoint}` + `${params ? '?' + querystring.stringify(params) : ''}`;
    }
    async getAccountInfo(accountId, subdomain) {
        const loggerContext = `${AmoApiService_1.name}/${this.getAccountInfo.name}`;
        try {
            if (!accountId) {
                this.logger.error(`accountId not found`, loggerContext);
                new common_1.HttpException(`accessToken or accountId not found`, common_1.HttpStatus.BAD_REQUEST);
            }
            const accountInfo = await this.accountRepository.getAccountById(accountId);
            if (!accountInfo) {
                this.logger.error(`Account with id => ${accountId}, not found!`, loggerContext);
                new common_1.HttpException(`Account with id => ${accountId}, not found!`, common_1.HttpStatus.NOT_FOUND);
            }
            if (accountInfo.subdomain !== subdomain) {
                accountInfo.subdomain = subdomain;
                await this.accountRepository.updateAccountByID(accountId, { subdomain });
            }
            return accountInfo;
        }
        catch (error) {
            const message = `Error while getting account info`;
            this.logger.error(error, loggerContext);
            (0, handleError_1.default)(error, message);
        }
    }
    async requestAccessToken(subdomain, code) {
        const loggerContext = `${AmoApiService_1.name}/${this.requestAccessToken.name}`;
        try {
            const { data: tokens } = await axios_1.default.post(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
                client_id: this.configService.get('CLIENT_UUID'),
                client_secret: this.configService.get('CLIENT_SECRET'),
                grant_type: auth_types_1.AuthTypes.Auth,
                redirect_uri: this.configService.get('REDIRECT_URI'),
                code,
            });
            return tokens;
        }
        catch (error) {
            const message = `Error while requesting access token`;
            this.logger.error(error, loggerContext);
            (0, handleError_1.default)(error, message);
        }
    }
    async refreshAccessToken(subdomain, refreshToken) {
        const loggerContext = `${AmoApiService_1.name}/${this.refreshAccessToken.name}`;
        try {
            const { data: tokens } = await axios_1.default.post(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
                client_id: this.configService.get('CLIENT_UUID'),
                client_secret: this.configService.get('CLIENT_SECRET'),
                grant_type: auth_types_1.AuthTypes.Refresh,
                refresh_token: refreshToken,
            });
            return tokens;
        }
        catch (error) {
            this.logger.error(error, loggerContext);
        }
    }
    async getUser({ accountId, subdomain }, userId, params) {
        const account = await this.getAccountInfo(accountId, subdomain);
        const url = this.createRequestUrl(subdomain, `users/${userId}`, params);
        return axios_1.default
            .get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        })
            .then((res) => res.data);
    }
    async getLeadInfo({ accountId, subdomain }, leadId) {
        const account = await this.accountRepository.getAccountById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        const url = this.createRequestUrl(account.subdomain, `leads/${leadId}`, { with: 'contacts' });
        console.log(url);
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });
        if (res.status === common_1.HttpStatus.NO_CONTENT) {
            return null;
        }
        return res.data;
    }
    async getAllLeads({ accountId, subdomain }, params) {
        const account = await this.accountRepository.getAccountById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        const url = this.createRequestUrl(account.subdomain, `leads`, params);
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });
        if (res.status === common_1.HttpStatus.NO_CONTENT) {
            return null;
        }
        return res.data._embedded.leads;
    }
    async getEntityInfo({ accountId, subdomain }, entityId, entityType) {
        const account = await this.accountRepository.getAccountById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        const url = this.createRequestUrl(account.subdomain, `${entityType}/${entityId}`);
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });
        if (res.status === common_1.HttpStatus.NO_CONTENT) {
            return null;
        }
        return res.data;
    }
};
exports.AmoApiService = AmoApiService;
__decorate([
    (0, use_token_authorization_decorator_1.UseTokenAuthorization)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AmoApiService.prototype, "getUser", null);
__decorate([
    (0, use_token_authorization_decorator_1.UseTokenAuthorization)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AmoApiService.prototype, "getLeadInfo", null);
__decorate([
    get_all_page_decorator_1.GetAllPage,
    (0, use_token_authorization_decorator_1.UseTokenAuthorization)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AmoApiService.prototype, "getAllLeads", null);
__decorate([
    (0, use_token_authorization_decorator_1.UseTokenAuthorization)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], AmoApiService.prototype, "getEntityInfo", null);
exports.AmoApiService = AmoApiService = AmoApiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [account_repository_1.AccountRepository,
        config_1.ConfigService,
        logger_service_1.Logger])
], AmoApiService);
//# sourceMappingURL=amo-api.service.js.map