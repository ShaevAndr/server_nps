import { Logger } from "core/logger/logger.service";
import { AmoApiService } from "modules/amo-api/amo-api.service";
import { Responsible } from "modules/lead-hooks/core/responsible.entities";
import { ResponsibleDocument } from "modules/lead-hooks/models/responsible.model";
import { ResponsibleRepository } from "modules/lead-hooks/repositiries/responsible.repository";
export declare class ResponsibleProcessing {
    private logger;
    private responsibleRepository;
    private amoServices;
    constructor(logger: Logger, responsibleRepository: ResponsibleRepository, amoServices: AmoApiService);
    getResponsible(accountId: number, subdomain: string, responsibleId: number): Promise<ResponsibleDocument>;
    updateResponsible(responsible: Responsible): Promise<ResponsibleDocument>;
}
