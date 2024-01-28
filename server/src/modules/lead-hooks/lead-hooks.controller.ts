import { Controller, Post, Body } from '@nestjs/common';
import { LeadHooksEndpoints, ModulesEndPoints } from 'core/constants/endpoints';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { LeadHookService } from './lead-hooks.services'
import { AccountDto } from './dtos/hook.dto';
import { UpdateHookDto } from './dtos/update-hook.dto';
import { DeleteHookDto } from './dtos/delete-lead-hook.dto';


@ApiTags('Обработка новой сделки')
@Controller(ModulesEndPoints.LeadHooks)
export class LeadsHooksController {
    constructor(private readonly leadHooksService: LeadHookService) { }

    @ApiOperation({ summary: 'хук на изменение сущности' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post(LeadHooksEndpoints.Update)
    public async updateLead(@Body() hook: UpdateHookDto): Promise<void> {
        await this.leadHooksService.updateEntity(hook)
    }

    @ApiOperation({ summary: 'Хук на удаление сделки' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post(LeadHooksEndpoints.Delete)
    public async deleteLead(@Body() hook: DeleteHookDto): Promise<void> {
        await this.leadHooksService.deleteLead(hook)
    }

    @ApiOperation({ summary: 'Загрузка всех сделок' })
    @ApiResponse({ status: HttpStatusCode.Created })
    @Post(LeadHooksEndpoints.AddAllLeads)
    public async addAllLeads(@Body() account: AccountDto): Promise<void> {
        await this.leadHooksService.fetchAllLeads(account.account_id, account.subdomain)
    }

    @ApiOperation({ summary: 'Удаление всех сделок' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post(LeadHooksEndpoints.DeleteAllLeads)
    public async deleteAllLeads(@Body() account: AccountDto): Promise<void> {
        await this.leadHooksService.deleteAllLeads(account.account_id)
    }
}


