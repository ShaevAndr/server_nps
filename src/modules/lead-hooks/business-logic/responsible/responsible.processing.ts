import { Injectable } from "@nestjs/common";
import { Logger } from "core/logger/logger.service";
import { AmoApiService } from "modules/amo-api/amo-api.service";
import { Responsible } from "modules/lead-hooks/core/responsible.entities";
import { ResponsibleDocument } from "modules/lead-hooks/models/responsible.model";
import { ResponsibleRepository } from "modules/lead-hooks/repositiries/responsible.repository";
import { responsibleFactory } from "modules/lead-hooks/utils/factory";

@Injectable()
export class ResponsibleProcessing {
    constructor(
        private logger: Logger,
        private responsibleRepository: ResponsibleRepository,
        private amoServices: AmoApiService
    ) { }

    async getResponsible(accountId: number, subdomain: string, responsibleId: number): Promise<ResponsibleDocument> {
        const loggerContext = `${ResponsibleProcessing.name}/${this.getResponsible.name}/${subdomain}`;
        this.logger.debug('Получении пользователя', loggerContext)

        const responsibleInBase = await this.responsibleRepository.getByUserId(accountId, responsibleId)
        if (!responsibleInBase) {
            const amoResponsible = await this.amoServices.getUser({ accountId, subdomain }, responsibleId)
            if (amoResponsible) {
                const newResponsible = responsibleFactory(amoResponsible, accountId)
                return await this.responsibleRepository.addOrUpdate(newResponsible)
            }
        }
        return responsibleInBase
    }

    async updateResponsible(responsible: Responsible): Promise<ResponsibleDocument> {
        const loggerContext = `${ResponsibleProcessing.name}/${this.updateResponsible.name}`;
        this.logger.debug('Создание нового контакта в базе или обновление', loggerContext, responsible.account_id)
        return await this.responsibleRepository.addOrUpdate(responsible)
    }
}