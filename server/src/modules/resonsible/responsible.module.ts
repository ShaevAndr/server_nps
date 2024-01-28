import { Module } from '@nestjs/common';
import { LoggerModule } from 'core/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AmoApiModule } from 'modules/amo-api/amo-api.module';
import { Responsible, ResponsibleSchema } from './models/responsible.model';
import { ResponsibleRepository } from './responsible.repository';
import { ResponsibleServices } from './responsible.services';

@Module({
    imports: [
        AmoApiModule,
        MongooseModule.forFeature([{ name: Responsible.name, schema: ResponsibleSchema }]),
        LoggerModule],
    providers: [
        ResponsibleRepository,
        ResponsibleServices,
    ],
    exports: [ResponsibleServices]
})

export class ResponsibleModule { }
