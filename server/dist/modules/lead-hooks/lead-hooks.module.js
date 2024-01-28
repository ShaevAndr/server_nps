"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadHooksModule = void 0;
const common_1 = require("@nestjs/common");
const lead_hooks_controller_1 = require("./lead-hooks.controller");
const lead_hooks_services_1 = require("./lead-hooks.services");
const logger_module_1 = require("../../core/logger/logger.module");
const custom_fields_model_1 = require("../custom-fields/models/custom-fields.model");
const mongoose_1 = require("@nestjs/mongoose");
const leads_processing_1 = require("./business-logic/leads-processing");
const lead_repository_1 = require("./lead.repository");
const account_leads_model_1 = require("./models/account-leads.model");
const contact_model_1 = require("../contact/models/contact.model");
const company_model_1 = require("../company/models/company.model");
const amo_api_module_1 = require("../amo-api/amo-api.module");
const responsible_model_1 = require("../resonsible/models/responsible.model");
const lead_models_1 = require("./models/lead.models");
const custom_fields_module_1 = require("../custom-fields/custom-fields.module");
const contact_module_1 = require("../contact/contact.module");
const responsible_module_1 = require("../resonsible/responsible.module");
const company_module_1 = require("../company/company.module");
let LeadHooksModule = class LeadHooksModule {
};
exports.LeadHooksModule = LeadHooksModule;
exports.LeadHooksModule = LeadHooksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            amo_api_module_1.AmoApiModule,
            mongoose_1.MongooseModule.forFeature([{ name: custom_fields_model_1.CustomField.name, schema: custom_fields_model_1.CustomFieldShema }]),
            mongoose_1.MongooseModule.forFeature([{ name: account_leads_model_1.AccountLeads.name, schema: account_leads_model_1.AccountLeadsSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: lead_models_1.Lead.name, schema: lead_models_1.LeadSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: contact_model_1.Contact.name, schema: contact_model_1.ContactSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: company_model_1.Company.name, schema: company_model_1.CompanySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: responsible_model_1.Responsible.name, schema: responsible_model_1.ResponsibleSchema }]),
            logger_module_1.LoggerModule, custom_fields_module_1.CustomFieldsModule, contact_module_1.ContactsModule, responsible_module_1.ResponsibleModule, company_module_1.CompaniesModule
        ],
        controllers: [lead_hooks_controller_1.LeadsHooksController],
        providers: [lead_hooks_services_1.LeadHookService,
            lead_repository_1.LeadsRepository,
            leads_processing_1.LeadsProcessing],
        exports: [lead_repository_1.LeadsRepository, leads_processing_1.LeadsProcessing, custom_fields_module_1.CustomFieldsModule, contact_module_1.ContactsModule, responsible_module_1.ResponsibleModule, company_module_1.CompaniesModule]
    })
], LeadHooksModule);
//# sourceMappingURL=lead-hooks.module.js.map