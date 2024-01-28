import { Client, EvalutionTime, NPS, Responsible } from "../const/fields.const";
import { leadInBase, Entity } from "../types/lead.type";

export const getClient = (lead: leadInBase, settingValue: string): string => {
    switch (settingValue) {
        case Client.LeadName:
            return lead.name || '-'
        case Client.ContactName:
            return lead.contact_id?.name || '-'
        case Client.CompanyName:
            return getNames(lead.company_id) || '-'
        default:
            return '-'
    }
}


export const getResponsible = (lead: leadInBase, settingValue: string): string => {
    if (settingValue === Responsible.Responsible) {
        return lead.responsible_id.name || '-'
    }
    return lead.fields.length ? findFromCustomFields(lead, settingValue) : '-'
}

export const getEvaluationDate = (lead: leadInBase, settingValue: string): string => {
    switch (settingValue) {
        case EvalutionTime.OpenDate:
            return String(lead.created_at) || '-'
        case EvalutionTime.CloseDate:
            return String(lead.closed_at) || '-'
        default:
            return lead.fields.length ? findFromCustomFields(lead, settingValue) : '-'
    }
}

export const getNPS = (lead: leadInBase, settingValue: string): string => {
    if (settingValue === NPS.NPS) {
        return lead.score || '-'
    }
    return lead.fields.length ? findFromCustomFields(lead, settingValue) : '-'

}

export const findFromCustomFields = (lead: leadInBase, settingValue: string): string => {
    for (const field of lead.fields) {
        if (field.custom_field.name === settingValue) {
            return field.values.length ? field.values.join(', ') : '-'
        }
    }
    return '-'
}

const getNames = (entities: Entity[]): string => {
    const names = entities?.map(entity => entity.name).join(', ')
    return names ? names : '-'
}


