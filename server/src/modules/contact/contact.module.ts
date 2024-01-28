import { Module } from '@nestjs/common';
import { LoggerModule } from 'core/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactServices } from './contact.services';
import { ContactRepository } from './contact.repository';
import { Contact, ContactSchema } from './models/contact.model';
import { AmoApiModule } from 'modules/amo-api/amo-api.module';

@Module({
    imports: [
        AmoApiModule,
        MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
        LoggerModule],
    providers: [
        ContactRepository,
        ContactServices,
    ],
    exports: [ContactServices]
})

export class ContactsModule { }
