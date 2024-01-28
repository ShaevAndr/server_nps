"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmoApiModule = void 0;
const common_1 = require("@nestjs/common");
const amo_api_service_1 = require("./amo-api.service");
const mongoose_1 = require("@nestjs/mongoose");
const account_repository_1 = require("../account/account.repository");
const logger_service_1 = require("../../core/logger/logger.service");
const account_models_1 = require("../account/models/account.models");
const config_1 = require("@nestjs/config");
let AmoApiModule = class AmoApiModule {
};
exports.AmoApiModule = AmoApiModule;
exports.AmoApiModule = AmoApiModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: account_models_1.Account.name, schema: account_models_1.AccountSchema }]),
        ],
        providers: [amo_api_service_1.AmoApiService, account_repository_1.AccountRepository, config_1.ConfigService, logger_service_1.Logger],
        exports: [amo_api_service_1.AmoApiService],
    })
], AmoApiModule);
//# sourceMappingURL=amo-api.module.js.map