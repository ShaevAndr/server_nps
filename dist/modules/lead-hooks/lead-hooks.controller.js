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
exports.LeadsHooksController = void 0;
const common_1 = require("@nestjs/common");
const endpoints_1 = require("../../core/constants/endpoints");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("axios");
const lead_hooks_services_1 = require("./lead-hooks.services");
const hook_dto_1 = require("./dtos/hook.dto");
const update_hook_dto_1 = require("./dtos/update-hook.dto");
const delete_lead_hook_dto_1 = require("./dtos/delete-lead-hook.dto");
let LeadsHooksController = class LeadsHooksController {
    constructor(leadHooksService) {
        this.leadHooksService = leadHooksService;
    }
    async updateLead(hook) {
        await this.leadHooksService.updateEntity(hook);
    }
    async deleteLead(hook) {
        await this.leadHooksService.deleteLead(hook);
    }
    async addAllLeads(account) {
        await this.leadHooksService.fetchAllLeads(account.account_id, account.subdomain);
    }
    async deleteAllLeads(account) {
        await this.leadHooksService.deleteAllLeads(account.account_id);
    }
};
exports.LeadsHooksController = LeadsHooksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'хук на изменение сущности' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Ok }),
    (0, common_1.Post)(endpoints_1.LeadHooksEndpoints.Update),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_hook_dto_1.UpdateHookDto]),
    __metadata("design:returntype", Promise)
], LeadsHooksController.prototype, "updateLead", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Хук на удаление сделки' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Ok }),
    (0, common_1.Post)(endpoints_1.LeadHooksEndpoints.Delete),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_lead_hook_dto_1.DeleteHookDto]),
    __metadata("design:returntype", Promise)
], LeadsHooksController.prototype, "deleteLead", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Загрузка всех сделок' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Created }),
    (0, common_1.Post)(endpoints_1.LeadHooksEndpoints.AddAllLeads),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hook_dto_1.AccountDto]),
    __metadata("design:returntype", Promise)
], LeadsHooksController.prototype, "addAllLeads", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление всех сделок' }),
    (0, swagger_1.ApiResponse)({ status: axios_1.HttpStatusCode.Ok }),
    (0, common_1.Post)(endpoints_1.LeadHooksEndpoints.DeleteAllLeads),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hook_dto_1.AccountDto]),
    __metadata("design:returntype", Promise)
], LeadsHooksController.prototype, "deleteAllLeads", null);
exports.LeadsHooksController = LeadsHooksController = __decorate([
    (0, swagger_1.ApiTags)('Обработка новой сделки'),
    (0, common_1.Controller)(endpoints_1.ModulesEndPoints.LeadHooks),
    __metadata("design:paramtypes", [lead_hooks_services_1.LeadHookService])
], LeadsHooksController);
//# sourceMappingURL=lead-hooks.controller.js.map