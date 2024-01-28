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
exports.AccountRepository = void 0;
const common_1 = require("@nestjs/common");
const account_models_1 = require("./models/account.models");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AccountRepository = class AccountRepository {
    constructor(_accountRepository) {
        this._accountRepository = _accountRepository;
    }
    async getAccountById(accountId) {
        const account = await this._accountRepository.findOne({ accountId: accountId }).exec();
        return account;
    }
    async createAccount(subdomain, accountId, tokens) {
        const newAccount = {
            subdomain,
            accountId,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token
        };
        const account = await this._accountRepository.create(newAccount);
        return account ? account.toObject() : null;
    }
    async updateAccountByID(accountId, updatedClient) {
        const account = await this._accountRepository.findOneAndUpdate({ accountId }, updatedClient);
        return account ? account.toObject() : null;
    }
};
exports.AccountRepository = AccountRepository;
exports.AccountRepository = AccountRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(account_models_1.Account.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AccountRepository);
//# sourceMappingURL=account.repository.js.map