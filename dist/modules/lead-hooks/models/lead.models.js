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
exports.LeadSchema = exports.Lead = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const fields_model_1 = require("./fields.model");
let Lead = class Lead extends mongoose_2.Document {
};
exports.Lead = Lead;
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", Number)
], Lead.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", Number)
], Lead.prototype, "account_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_3.Types.ObjectId, ref: 'Responsible' }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], Lead.prototype, "responsible_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Lead.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_3.Types.ObjectId], ref: 'Company' }),
    __metadata("design:type", Array)
], Lead.prototype, "company_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId, ref: 'Contact' }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], Lead.prototype, "contact_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Lead.prototype, "pipeline", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Lead.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Lead.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Lead.prototype, "closed_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Lead.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Lead.prototype, "NPS", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [fields_model_1.FieldsShema] }),
    __metadata("design:type", Array)
], Lead.prototype, "fields", void 0);
exports.Lead = Lead = __decorate([
    (0, mongoose_1.Schema)()
], Lead);
exports.LeadSchema = mongoose_1.SchemaFactory.createForClass(Lead).index({ type: 1 });
//# sourceMappingURL=lead.models.js.map