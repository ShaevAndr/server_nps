import { Controller, Get, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountEndpoints, ModulesEndPoints } from 'core/constants/endpoints';
import { HttpStatusCode } from 'axios';
import { PaymentStatusQueryDto, AccountInstallDto, AccountUninstallDto } from './dtos';
import { Account } from './entities/account.entities';
import { PaidStatus } from 'types/paidStatus';

@ApiTags('Работа с пользователем виджета')
@Controller(ModulesEndPoints.Account)
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @ApiOperation({ summary: 'Установка пользователем виджета' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(AccountEndpoints.Install)
    public async install(@Query() widgetAccountInfo: AccountInstallDto): Promise<Account> {
        console.log('install')
        return await this.accountService.installWidget(widgetAccountInfo);
    }

    @ApiOperation({ summary: 'Удаления пользователем виджета' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(AccountEndpoints.Delete)
    public async unInstall(@Query() widgetAccountInfo: AccountUninstallDto): Promise<Account> {
        return await this.accountService.uninstallWidget(widgetAccountInfo.account_id);
    }


    @ApiOperation({ summary: 'Получение статуса оплаты' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(AccountEndpoints.Status)
    public async status(@Query() query: PaymentStatusQueryDto): Promise<PaidStatus> {
        return await this.accountService.getPaidStatus(query.accountId);
    }
}