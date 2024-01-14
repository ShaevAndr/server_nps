"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportEndpoints = exports.ModulesEndPoints = exports.LeadHooksEndpoints = exports.ReportSettingsEndpoints = exports.AccountEndpoints = void 0;
exports.AccountEndpoints = {
    Install: 'install',
    Delete: 'delete',
    Status: 'status'
};
exports.ReportSettingsEndpoints = {
    GetAll: 'get_all',
    Delete: 'delete',
    Update: 'update',
    GetByName: 'get_one',
    Add: 'add'
};
exports.LeadHooksEndpoints = {
    Delete: 'delete',
    Update: 'update',
    AddAllLeads: 'add_all_leads',
    DeleteAllLeads: 'delte_all_leads'
};
exports.ModulesEndPoints = {
    Account: 'account',
    LeadHooks: 'leads_hooks',
    ReportSettings: 'report_settings',
    Report: 'report'
};
exports.ReportEndpoints = {
    GetReport: 'get_report'
};
//# sourceMappingURL=endpoints.js.map