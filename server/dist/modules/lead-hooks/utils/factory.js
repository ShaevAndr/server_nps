"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldFactory = exports.responsibleFactory = exports.leadFactory = exports.contactFactory = exports.companyFactory = void 0;
const company_entity_1 = require("../../company/core/company.entity");
const contact_entity_1 = require("../../contact/core/contact.entity");
const lead_entity_1 = require("../core/lead.entity");
const responsible_entities_1 = require("../../resonsible/core/responsible.entities");
const custom_field_entities_1 = require("../../custom-fields/core/custom-field.entities");
const companyFactory = (accountId, entityId, name) => {
    const newCompany = new company_entity_1.Company();
    newCompany.account_id = accountId;
    newCompany.id = entityId;
    newCompany.name = name;
    return newCompany;
};
exports.companyFactory = companyFactory;
const contactFactory = (accountId, entityId, name) => {
    const newContact = new contact_entity_1.Contact();
    newContact.account_id = accountId;
    newContact.id = entityId;
    newContact.name = name;
    return newContact;
};
exports.contactFactory = contactFactory;
const leadFactory = (amoLead) => {
    const newLead = new lead_entity_1.Lead();
    newLead.account_id = amoLead.account_id;
    newLead.id = amoLead.id;
    newLead.name = amoLead.name;
    newLead.created_at = amoLead.created_at;
    newLead.closed_at = amoLead.closed_at;
    newLead.updated_at = amoLead.updated_at;
    newLead.score = amoLead.score;
    return newLead;
};
exports.leadFactory = leadFactory;
const responsibleFactory = (amoResponsible, accountId) => {
    const responsible = new responsible_entities_1.Responsible;
    responsible.account_id = accountId;
    responsible.id = amoResponsible.id;
    responsible.name = amoResponsible.name;
    return responsible;
};
exports.responsibleFactory = responsibleFactory;
const fieldFactory = (accountId, field) => {
    const newField = new custom_field_entities_1.Field();
    newField.account_id = accountId;
    newField.id = field.field_id;
    newField.name = field.field_name;
    newField.type = field.field_type;
    return newField;
};
exports.fieldFactory = fieldFactory;
//# sourceMappingURL=factory.js.map