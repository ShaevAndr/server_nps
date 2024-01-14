"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const account_controller_1 = require("./account.controller");
const logger_module_1 = require("../../core/logger/logger.module");
const amo_api_module_1 = require("../amo-api/amo-api.module");
const account_repository_1 = require("./account.repository");
const mongoose_1 = require("@nestjs/mongoose");
const account_models_1 = require("./models/account.models");
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: account_models_1.Account.name, schema: account_models_1.AccountSchema }]),
            logger_module_1.LoggerModule,
            amo_api_module_1.AmoApiModule],
        controllers: [account_controller_1.AccountController],
        providers: [account_service_1.AccountService, account_repository_1.AccountRepository],
        exports: [account_service_1.AccountService, account_repository_1.AccountRepository]
    })
], AccountModule);
//# sourceMappingURL=account.module.js.map