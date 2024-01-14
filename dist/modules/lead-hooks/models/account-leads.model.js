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
exports.AccountLeadsSchema = exports.AccountLeads = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AccountLeads = class AccountLeads extends mongoose_2.Document {
};
exports.AccountLeads = AccountLeads;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AccountLeads.prototype, "subdomain", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], AccountLeads.prototype, "account_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [mongoose_2.Types.ObjectId], ref: 'Lead' }),
    __metadata("design:type", Array)
], AccountLeads.prototype, "leads", void 0);
exports.AccountLeads = AccountLeads = __decorate([
    (0, mongoose_1.Schema)()
], AccountLeads);
exports.AccountLeadsSchema = mongoose_1.SchemaFactory.createForClass(AccountLeads);
//# sourceMappingURL=account-leads.model.js.map