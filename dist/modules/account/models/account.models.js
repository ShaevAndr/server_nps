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
exports.AccountSchema = exports.Account = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dayjs = require("dayjs");
let Account = class Account extends mongoose_2.Document {
};
exports.Account = Account;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Account.prototype, "accountId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "accessToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "refreshToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "subdomain", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], Account.prototype, "installed", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: dayjs().format('YYYY-MM-DD')
    }),
    __metadata("design:type", String)
], Account.prototype, "startUsingDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: dayjs().add(15, 'days').format('YYYY-MM-DD')
    }),
    __metadata("design:type", String)
], Account.prototype, "finishUsingTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], Account.prototype, "isTestPeriod", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], Account.prototype, "isPaid", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], Account.prototype, "isActive", void 0);
exports.Account = Account = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Account);
exports.AccountSchema = mongoose_1.SchemaFactory.createForClass(Account);
//# sourceMappingURL=account.models.js.map