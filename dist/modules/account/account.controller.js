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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const swagger_1 = require("@nestjs/swagger");
const endpoints_1 = require("../../core/constants/endpoints");
const axios_1 = require("axios");
const dtos_1 = require("./dtos");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async install(widgetAccountInfo) {
        console.log('install');
        return await this.accountService.installWidget(widgetAccountInfo);
    }
    async unInstall(widgetAccountInfo) {
        return await this.accountService.uninstallWidget(widgetAccountInfo.account_id);
    }
    async status(query) {
        return await this.accountService.getPaidStatus(query.accountId);
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Установка пользователем виджета' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Ok }),
    (0, common_1.Get)(endpoints_1.AccountEndpoints.Install),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.AccountInstallDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "install", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаления пользователем виджета' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Ok }),
    (0, common_1.Get)(endpoints_1.AccountEndpoints.Delete),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.AccountUninstallDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "unInstall", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение статуса оплаты' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Ok }),
    (0, common_1.Get)(endpoints_1.AccountEndpoints.Status),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.PaymentStatusQueryDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "status", null);
exports.AccountController = AccountController = __decorate([
    (0, swagger_1.ApiTags)('Работа с пользователем виджета'),
    (0, common_1.Controller)(endpoints_1.ModulesEndPoints.Account),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map