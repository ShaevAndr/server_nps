import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from 'modules/account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ReportSettingsModule } from 'modules/report-settings/report-settings.module';
import { LeadHooksModule } from 'modules/lead-hooks/lead-hooks.module';
import { ReportModule } from 'modules/report/report.module';

@Module({
  imports: [
    ReportModule,
    AccountModule,
    ReportSettingsModule,
    LeadHooksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.${process.env.NODE_ENV}.env`, 
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGO_CONNECT: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        CLIENT_UUID: Joi.string().required(),
        CLIENT_SECRET: Joi.string().required(),
        REDIRECT_URI: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_CONNECT'),
        dbName: configService.get('DB_NAME'),
      }),
      inject: [ConfigService],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } 
