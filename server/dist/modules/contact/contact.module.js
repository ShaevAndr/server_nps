"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsModule = void 0;
const common_1 = require("@nestjs/common");
const logger_module_1 = require("../../core/logger/logger.module");
const mongoose_1 = require("@nestjs/mongoose");
const contact_services_1 = require("./contact.services");
const contact_repository_1 = require("./contact.repository");
const contact_model_1 = require("./models/contact.model");
const amo_api_module_1 = require("../amo-api/amo-api.module");
let ContactsModule = class ContactsModule {
};
exports.ContactsModule = ContactsModule;
exports.ContactsModule = ContactsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            amo_api_module_1.AmoApiModule,
            mongoose_1.MongooseModule.forFeature([{ name: contact_model_1.Contact.name, schema: contact_model_1.ContactSchema }]),
            logger_module_1.LoggerModule
        ],
        providers: [
            contact_repository_1.ContactRepository,
            contact_services_1.ContactServices,
        ],
        exports: [contact_services_1.ContactServices]
    })
], ContactsModule);
//# sourceMappingURL=contact.module.js.map