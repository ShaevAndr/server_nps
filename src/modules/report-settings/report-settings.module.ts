import { Module } from '@nestjs/common';
import { ReportSettingsService } from './report-settings.services';
import { ReportSettingsController } from './report-settings.controller';
import { LoggerModule } from 'core/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSettings, ReportSettingsSchema } from './models/report-settings.model';
import { ReportSettingsRepository } from './report-settings.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: ReportSettings.name, schema: ReportSettingsSchema }]), LoggerModule],
    controllers: [ReportSettingsController],
    providers: [ReportSettingsService, ReportSettingsRepository],
    exports: [ReportSettingsService, ReportSettingsRepository]
})
export class ReportSettingsModule { }
