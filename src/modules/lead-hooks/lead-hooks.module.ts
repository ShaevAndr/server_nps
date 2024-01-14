import { Module } from '@nestjs/common';
import { LeadsHooksController } from './lead-hooks.controller';
import { LeadHookService } from './lead-hooks.services';
import { LoggerModule } from 'core/logger/logger.module';
import { CustomFieldShema, CustomField } from './models/custom-fields.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomFieldsRepository } from './repositiries/custom-fields.repository';
import { FieldsProcessing } from './business-logic/fields/fields-processing';
import { CompanyProcessing } from './business-logic/company/company.processing';
import { ContactProcessing } from './business-logic/contact/contact.processing';
import { LeadsProcessing } from './business-logic/leads/leads-processing';
import { CompanyRepository } from './repositiries/company.repository';
import { ContactRepository } from './repositiries/contact.repository';
import { LeadsRepository } from './repositiries/lead.repository';
import { AccountLeadsSchema, AccountLeads } from './models/account-leads.model';
import { Contact, ContactSchema } from './models/contact.model';
import { Company, CompanySchema } from './models/company.model';
import { AmoApiModule } from 'modules/amo-api/amo-api.module';
import { ResponsibleProcessing } from './business-logic/responsible/responsible.processing';
import { ResponsibleRepository } from './repositiries/responsible.repository';
import { Responsible, ResponsibleSchema } from './models/responsible.model';
import { Lead, LeadSchema } from './models/lead.models';

@Module({
    imports: [
        AmoApiModule,
        MongooseModule.forFeature([{ name: CustomField.name, schema: CustomFieldShema }]),
        MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
        MongooseModule.forFeature([{ name: AccountLeads.name, schema: AccountLeadsSchema }]),
        MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
        MongooseModule.forFeature([{ name: Responsible.name, schema: ResponsibleSchema }]),
        LoggerModule],
    controllers: [LeadsHooksController],
    providers: [LeadHookService,
        CustomFieldsRepository,
        CompanyRepository,
        ContactRepository,
        ResponsibleRepository,
        LeadsRepository,
        FieldsProcessing,
        CompanyProcessing,
        ContactProcessing,
        ResponsibleProcessing,
        LeadsProcessing],
    exports: [LeadHookService,
        CustomFieldsRepository,
        CompanyRepository,
        ContactRepository,
        ResponsibleRepository,
        LeadsRepository,
        FieldsProcessing,
        CompanyProcessing,
        ContactProcessing,
        ResponsibleProcessing,
        LeadsProcessing
    ]
})

export class LeadHooksModule { }
