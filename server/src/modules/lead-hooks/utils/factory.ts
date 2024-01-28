import { AmoLead, User, CustomField } from "../../amo-api/types/amo-api.types"
import { Company } from "../../company/entities/company.entity"
import { Contact } from "../../contact/entities/contact.entity"
import { Lead } from "../entities/lead.entity"
import { Responsible } from "../../resonsible/entities/responsible.entities"
import { Field } from "../../custom-fields/entities/custom-field.entities"

export const companyFactory = (accountId: number, entityId: number, name: string): Company => {
    const newCompany = new Company()
    newCompany.account_id = accountId
    newCompany.id = entityId
    newCompany.name = name
    return newCompany
}

export const contactFactory = (accountId: number, entityId: number, name: string): Contact => {
    const newContact = new Contact()
    newContact.account_id = accountId
    newContact.id = entityId
    newContact.name = name
    return newContact
}

export const leadFactory = (amoLead: AmoLead): Lead => {
    const newLead = new Lead()
    newLead.account_id = amoLead.account_id
    newLead.id = amoLead.id
    newLead.name = amoLead.name
    newLead.created_at = amoLead.created_at
    newLead.closed_at = amoLead.closed_at
    newLead.updated_at = amoLead.updated_at
    newLead.score = amoLead.score
    return newLead
}

export const responsibleFactory = (amoResponsible: User, accountId: number): Responsible => {
    const responsible = new Responsible()
    responsible.account_id = accountId
    responsible.id = amoResponsible.id
    responsible.name = amoResponsible.name
    return responsible
}

export const fieldFactory = (accountId: number, field: CustomField): Field => {
    const newField = new Field()
    newField.account_id = accountId
    newField.id = field.field_id
    newField.name = field.field_name
    newField.type = field.field_type
    return newField
}