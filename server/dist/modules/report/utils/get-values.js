"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFromCustomFields = exports.getNPS = exports.getEvaluationDate = exports.getResponsible = exports.getClient = void 0;
const fields_const_1 = require("../const/fields.const");
const getClient = (lead, settingValue) => {
    switch (settingValue) {
        case fields_const_1.Client.LeadName:
            return lead.name || '-';
        case fields_const_1.Client.ContactName:
            return lead.contact_id?.name || '-';
        case fields_const_1.Client.CompanyName:
            return getNames(lead.company_id) || '-';
        default:
            return '-';
    }
};
exports.getClient = getClient;
const getResponsible = (lead, settingValue) => {
    if (settingValue === fields_const_1.Responsible.Responsible) {
        return lead.responsible_id.name || '-';
    }
    return lead.fields.length ? (0, exports.findFromCustomFields)(lead, settingValue) : '-';
};
exports.getResponsible = getResponsible;
const getEvaluationDate = (lead, settingValue) => {
    switch (settingValue) {
        case fields_const_1.EvalutionTime.OpenDate:
            return String(lead.created_at) || '-';
        case fields_const_1.EvalutionTime.CloseDate:
            return String(lead.closed_at) || '-';
        default:
            return lead.fields.length ? (0, exports.findFromCustomFields)(lead, settingValue) : '-';
    }
};
exports.getEvaluationDate = getEvaluationDate;
const getNPS = (lead, settingValue) => {
    if (settingValue === fields_const_1.NPS.NPS) {
        return lead.score || '-';
    }
    return lead.fields.length ? (0, exports.findFromCustomFields)(lead, settingValue) : '-';
};
exports.getNPS = getNPS;
const findFromCustomFields = (lead, settingValue) => {
    for (const field of lead.fields) {
        if (field.custom_field.name === settingValue) {
            return field.values.length ? field.values.join(', ') : '-';
        }
    }
    return '-';
};
exports.findFromCustomFields = findFromCustomFields;
const getNames = (entities) => {
    const names = entities?.map(entity => entity.name).join(', ');
    return names ? names : '-';
};
//# sourceMappingURL=get-values.js.map