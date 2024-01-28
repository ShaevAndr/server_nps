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
exports.AccountInstallDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AccountInstallDto {
}
exports.AccountInstallDto = AccountInstallDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'def502009b3d2ab2cc759db4c1a98061767e0',
        description: 'Код авторизации, приходит из AmoCRM',
    }),
    __metadata("design:type", String)
], AccountInstallDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example.amocrm.ru', description: 'Адрес аккаунта пользователя' }),
    __metadata("design:type", String)
], AccountInstallDto.prototype, "referer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8db75afd-e11d-4315-9131-882c75ff8d15', description: 'ID интеграции' }),
    __metadata("design:type", String)
], AccountInstallDto.prototype, "client_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", String)
], AccountInstallDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Говорит о том, что запрос был вызван установкой виджета' }),
    __metadata("design:type", String)
], AccountInstallDto.prototype, "from_widget", void 0);
//# sourceMappingURL=account-install.dto.js.map