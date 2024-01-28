import { Module } from '@nestjs/common';
import { LeadHooksModule } from 'modules/lead-hooks/lead-hooks.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { LeadsProcessing } from 'modules/lead-hooks/business-logic/leads-processing';
import { ReportSettingsService } from 'modules/report-settings/report-settings.services';
import { AmoApiService } from 'modules/amo-api/amo-api.service';
import { Logger } from 'core/logger/logger.service';
import { ReportSettingsModule } from 'modules/report-settings/report-settings.module';
import { AccountModule } from 'modules/account/account.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [LeadHooksModule, ReportSettingsModule, AccountModule, CacheModule.register(),],
    controllers: [ReportController],
    providers: [ReportService,
        LeadsProcessing,
        ReportSettingsService,
        Logger,
        AmoApiService
    ]
})
export class ReportModule { }
