"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const default_entity_1 = require("../../../types/default.entity");
class Lead extends default_entity_1.DefaultEntity {
    constructor() {
        super(...arguments);
        this.company_id = [];
        this.fields = [];
    }
}
exports.Lead = Lead;
//# sourceMappingURL=lead.entity.js.map