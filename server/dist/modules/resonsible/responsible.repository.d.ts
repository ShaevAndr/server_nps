import { ResponsibleDocument, Responsible } from './models/responsible.model';
import { Responsible as ResponsibleEntity } from './core/responsible.entities';
import { Model } from 'mongoose';
import { Logger } from 'core/logger/logger.service';
export declare class ResponsibleRepository {
    private readonly responsibleRepository;
    private readonly logger;
    constructor(responsibleRepository: Model<Responsible>, logger: Logger);
    addOrUpdate(user: ResponsibleEntity): Promise<ResponsibleDocument>;
    getByUserId(accountId: number, userId: number): Promise<ResponsibleDocument>;
    deleteAllUsers(accountId: number): Promise<void>;
}
