"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldsModule = void 0;
const common_1 = require("@nestjs/common");
const logger_module_1 = require("../../core/logger/logger.module");
const mongoose_1 = require("@nestjs/mongoose");
const amo_api_module_1 = require("../amo-api/amo-api.module");
const custom_fields_model_1 = require("./models/custom-fields.model");
const custom_fields_repository_1 = require("./custom-fields.repository");
const fields_services_1 = require("./fields.services");
let CustomFieldsModule = class CustomFieldsModule {
};
exports.CustomFieldsModule = CustomFieldsModule;
exports.CustomFieldsModule = CustomFieldsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            amo_api_module_1.AmoApiModule,
            mongoose_1.MongooseModule.forFeature([{ name: custom_fields_model_1.CustomField.name, schema: custom_fields_model_1.CustomFieldShema }]),
            logger_module_1.LoggerModule
        ],
        providers: [
            custom_fields_repository_1.CustomFieldsRepository,
            fields_services_1.FieldsServices,
        ],
        exports: [fields_services_1.FieldsServices]
    })
], CustomFieldsModule);
//# sourceMappingURL=custom-fields.module.js.map