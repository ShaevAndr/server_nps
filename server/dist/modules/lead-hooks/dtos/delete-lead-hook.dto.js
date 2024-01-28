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
exports.DeleteHookDto = exports.LeadsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class Account {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Account.prototype, "subdomain", void 0);
class LeadsDto {
}
exports.LeadsDto = LeadsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Lead),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], LeadsDto.prototype, "delete", void 0);
class DeleteHookDto {
}
exports.DeleteHookDto = DeleteHookDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Account)
], DeleteHookDto.prototype, "account", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", LeadsDto)
], DeleteHookDto.prototype, "leads", void 0);
class Lead {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Lead.prototype, "id", void 0);
//# sourceMappingURL=delete-lead-hook.dto.js.map