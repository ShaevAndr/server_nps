import { Module } from '@nestjs/common';
import { LeadsHooksController } from './lead-hooks.controller';
import { LeadHookService } from './lead-hooks.services';
import { LoggerModule } from 'core/logger/logger.module';
import { CustomFieldShema, CustomField } from '../custom-fields/models/custom-fields.model';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadsProcessing } from './business-logic/leads-processing';
import { LeadsRepository } from './lead.repository';
import { AccountLeadsSchema, AccountLeads } from './models/account-leads.model';
import { Contact, ContactSchema } from '../contact/models/contact.model';
import { Company, CompanySchema } from '../company/models/company.model';
import { AmoApiModule } from 'modules/amo-api/amo-api.module';
import { Responsible, ResponsibleSchema } from '../resonsible/models/responsible.model';
import { Lead, LeadSchema } from './models/lead.models';
import { CustomFieldsModule } from 'modules/custom-fields/custom-fields.module';
import { ContactsModule } from 'modules/contact/contact.module';
import { ResponsibleModule } from 'modules/resonsible/responsible.module';
import { CompaniesModule } from 'modules/company/company.module';

@Module({
    imports: [
        AmoApiModule,
        MongooseModule.forFeature([{ name: CustomField.name, schema: CustomFieldShema }]),
        MongooseModule.forFeature([{ name: AccountLeads.name, schema: AccountLeadsSchema }]),
        MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
        MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
        MongooseModule.forFeature([{ name: Responsible.name, schema: ResponsibleSchema }]),
        LoggerModule, CustomFieldsModule, ContactsModule, ResponsibleModule, CompaniesModule],
    controllers: [LeadsHooksController],
    providers: [LeadHookService,
        LeadsRepository,
        LeadsProcessing],
    exports: [LeadsRepository, LeadsProcessing, CustomFieldsModule, ContactsModule, ResponsibleModule, CompaniesModule]
})

export class LeadHooksModule { }
