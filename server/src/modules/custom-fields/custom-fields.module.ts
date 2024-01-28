import { Module } from '@nestjs/common';
import { LoggerModule } from 'core/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AmoApiModule } from 'modules/amo-api/amo-api.module';
import { CustomField, CustomFieldShema } from './models/custom-fields.model';
import { CustomFieldsRepository } from './custom-fields.repository';
import { FieldsServices } from './fields.services';

@Module({
    imports: [
        AmoApiModule,
        MongooseModule.forFeature([{ name: CustomField.name, schema: CustomFieldShema }]),
        LoggerModule],
    providers: [
        CustomFieldsRepository,
        FieldsServices,
    ],
    exports: [FieldsServices]
})

export class CustomFieldsModule { }
