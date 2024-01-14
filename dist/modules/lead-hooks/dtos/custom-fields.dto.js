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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldsDto = exports.CustomFieldDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CustomFieldDto {
}
exports.CustomFieldDto = CustomFieldDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Доп услуги', description: 'Название кастомного поля' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustomFieldDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '777', description: 'id поля' }),
    (0, class_transformer_1.Transform)((value) => Number(value)),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CustomFieldDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123', description: 'Id аккаунта' }),
    (0, class_transformer_1.Transform)((value) => Number(value)),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CustomFieldDto.prototype, "account_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'checkbox', description: 'Тип поля' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustomFieldDto.prototype, "type", void 0);
class CustomFieldsDto {
}
exports.CustomFieldsDto = CustomFieldsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Array', description: 'Массив кастомных полей' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CustomFieldDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CustomFieldsDto.prototype, "custom_fields", void 0);
function ParseNumber() {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=custom-fields.dto.js.map