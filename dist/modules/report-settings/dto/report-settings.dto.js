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
exports.ReportSettingsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ReportSettingsDto {
}
exports.ReportSettingsDto = ReportSettingsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Главная настройка!', description: 'Название настройки' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReportSettingsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'myaccount', description: 'Субдомен amoCrm' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReportSettingsDto.prototype, "subdomain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'myaccount', description: 'Субдомен amoCrm' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ReportSettingsDto.prototype, "account_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Имя сделки', description: 'Выбор: "имя сделки", "имя компании",  "имя контакта"' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReportSettingsDto.prototype, "Leads", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ответственный за сделку', description: 'Выбор поля ответственного' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReportSettingsDto.prototype, "Responsible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Продукт', description: 'Выбор поля продукта' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReportSettingsDto.prototype, "ProductGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Дата создания сделки', description: 'Выбор поля с типом "время"' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReportSettingsDto.prototype, "EvaluationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Бал по проекту', description: 'Выбор поля относящегося к NPS' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReportSettingsDto.prototype, "Nps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Комментарий', description: 'Текстовые поля' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReportSettingsDto.prototype, "Comment", void 0);
//# sourceMappingURL=report-settings.dto.js.map