import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { LoggerModule } from 'core/logger/logger.module';
import { AmoApiModule } from 'modules/amo-api/amo-api.module';
import { AccountRepository } from './account.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './models/account.models';

@Module({
    imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        LoggerModule,
        AmoApiModule],
    controllers: [AccountController],
    providers: [AccountService, AccountRepository],
    exports: [AccountService, AccountRepository]
})
export class AccountModule { }
