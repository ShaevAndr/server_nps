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
var ResponsibleServices_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsibleServices = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../core/logger/logger.service");
const amo_api_service_1 = require("../amo-api/amo-api.service");
const responsible_repository_1 = require("./responsible.repository");
const factory_1 = require("../lead-hooks/utils/factory");
let ResponsibleServices = ResponsibleServices_1 = class ResponsibleServices {
    constructor(logger, responsibleRepository, amoServices) {
        this.logger = logger;
        this.responsibleRepository = responsibleRepository;
        this.amoServices = amoServices;
    }
    async getResponsible(accountId, subdomain, responsibleId) {
        const loggerContext = `${ResponsibleServices_1.name}/${this.getResponsible.name}/${subdomain}`;
        this.logger.debug('Получении пользователя', loggerContext);
        const responsibleInBase = await this.responsibleRepository.getByUserId(accountId, responsibleId);
        if (!responsibleInBase) {
            const amoResponsible = await this.amoServices.getUser({ accountId, subdomain }, responsibleId);
            if (amoResponsible) {
                const newResponsible = (0, factory_1.responsibleFactory)(amoResponsible, accountId);
                return await this.responsibleRepository.addOrUpdate(newResponsible);
            }
        }
        return responsibleInBase;
    }
    async updateResponsible(responsible) {
        const loggerContext = `${ResponsibleServices_1.name}/${this.updateResponsible.name}`;
        this.logger.debug('Создание нового контакта в базе или обновление', loggerContext, responsible.account_id);
        return await this.responsibleRepository.addOrUpdate(responsible);
    }
};
exports.ResponsibleServices = ResponsibleServices;
exports.ResponsibleServices = ResponsibleServices = ResponsibleServices_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.Logger,
        responsible_repository_1.ResponsibleRepository,
        amo_api_service_1.AmoApiService])
], ResponsibleServices);
//# sourceMappingURL=responsible.services.js.map