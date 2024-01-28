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
var AmoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const logger_service_1 = require("../../core/logger/logger.service");
const auth_types_1 = require("./consts/auth-types");
let AmoService = AmoService_1 = class AmoService {
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
    }
    async requestAccessToken(subdomain, code) {
        const loggerContext = `${AmoService_1.name}/${this.requestAccessToken.name}`;
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
            this.logger.error(error, loggerContext);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AmoService = AmoService;
exports.AmoService = AmoService = AmoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        logger_service_1.Logger])
], AmoService);
//# sourceMappingURL=amo-api.services.js.map