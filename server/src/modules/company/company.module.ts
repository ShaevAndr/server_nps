import { Module } from '@nestjs/common';
import { LoggerModule } from 'core/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyServices } from './company.services';
import { CompanyRepository } from './company.repository';
import { Company, CompanySchema } from './models/company.model';
import { AmoApiModule } from 'modules/amo-api/amo-api.module';

@Module({
    imports: [
        AmoApiModule,
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
        LoggerModule],
    providers: [
        CompanyRepository,
        CompanyServices,
    ],
    exports: [CompanyServices]
})

export class CompaniesModule { }
