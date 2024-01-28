import { ConfigService } from '@nestjs/config';
import { Logger } from '../../core/logger/logger.service';
import { SuccessTokenResponse } from './types/token.type';
import { ApplicationConfigSchema } from 'core/config/app.schema';
export declare class AmoService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService<ApplicationConfigSchema>, logger: Logger);
    requestAccessToken(subdomain: string, code: string): Promise<SuccessTokenResponse>;
}
