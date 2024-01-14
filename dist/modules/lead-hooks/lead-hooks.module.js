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
const custom_fields_model_1 = require("./models/custom-fields.model");
const mongoose_1 = require("@nestjs/mongoose");
const custom_fields_repository_1 = require("./repositiries/custom-fields.repository");
const fields_processing_1 = require("./business-logic/fields/fields-processing");
const company_processing_1 = require("./business-logic/company/company.processing");
const contact_processing_1 = require("./business-logic/contact/contact.processing");
const leads_processing_1 = require("./business-logic/leads/leads-processing");
const company_repository_1 = require("./repositiries/company.repository");
const contact_repository_1 = require("./repositiries/contact.repository");
const lead_repository_1 = require("./repositiries/lead.repository");
const account_leads_model_1 = require("./models/account-leads.model");
const contact_model_1 = require("./models/contact.model");
const company_model_1 = require("./models/company.model");
const amo_api_module_1 = require("../amo-api/amo-api.module");
const responsible_processing_1 = require("./business-logic/responsible/responsible.processing");
const responsible_repository_1 = require("./repositiries/responsible.repository");
const responsible_model_1 = require("./models/responsible.model");
const lead_models_1 = require("./models/lead.models");
let LeadHooksModule = class LeadHooksModule {
};
exports.LeadHooksModule = LeadHooksModule;
exports.LeadHooksModule = LeadHooksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            amo_api_module_1.AmoApiModule,
            mongoose_1.MongooseModule.forFeature([{ name: custom_fields_model_1.CustomField.name, schema: custom_fields_model_1.CustomFieldShema }]),
            mongoose_1.MongooseModule.forFeature([{ name: lead_models_1.Lead.name, schema: lead_models_1.LeadSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: account_leads_model_1.AccountLeads.name, schema: account_leads_model_1.AccountLeadsSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: contact_model_1.Contact.name, schema: contact_model_1.ContactSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: company_model_1.Company.name, schema: company_model_1.CompanySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: responsible_model_1.Responsible.name, schema: responsible_model_1.ResponsibleSchema }]),
            logger_module_1.LoggerModule
        ],
        controllers: [lead_hooks_controller_1.LeadsHooksController],
        providers: [lead_hooks_services_1.LeadHookService,
            custom_fields_repository_1.CustomFieldsRepository,
            company_repository_1.CompanyRepository,
            contact_repository_1.ContactRepository,
            responsible_repository_1.ResponsibleRepository,
            lead_repository_1.LeadsRepository,
            fields_processing_1.FieldsProcessing,
            company_processing_1.CompanyProcessing,
            contact_processing_1.ContactProcessing,
            responsible_processing_1.ResponsibleProcessing,
            leads_processing_1.LeadsProcessing],
        exports: [lead_hooks_services_1.LeadHookService,
            custom_fields_repository_1.CustomFieldsRepository,
            company_repository_1.CompanyRepository,
            contact_repository_1.ContactRepository,
            responsible_repository_1.ResponsibleRepository,
            lead_repository_1.LeadsRepository,
            fields_processing_1.FieldsProcessing,
            company_processing_1.CompanyProcessing,
            contact_processing_1.ContactProcessing,
            responsible_processing_1.ResponsibleProcessing,
            leads_processing_1.LeadsProcessing
        ]
    })
], LeadHooksModule);
//# sourceMappingURL=lead-hooks.module.js.map