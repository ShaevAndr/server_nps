import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Logger } from '../../core/logger/logger.service';
import { AuthTypes } from './constants/auth-types';
import { SuccessTokenResponse } from './types/token.type';
import { ApplicationConfigSchema } from 'core/config/app.schema';



@Injectable()
export class AmoService {
    constructor(
        private readonly configService: ConfigService<ApplicationConfigSchema>,
        private readonly logger: Logger,
    ) { }


    public async requestAccessToken(subdomain: string, code: string): Promise<SuccessTokenResponse> {
        const loggerContext = `${AmoService.name}/${this.requestAccessToken.name}`;

        try {
            const { data: tokens } = await axios.post<SuccessTokenResponse>(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
                client_id: this.configService.get('CLIENT_UUID'),
                client_secret: this.configService.get('CLIENT_SECRET'),
                grant_type: AuthTypes.Auth,
                redirect_uri: this.configService.get('REDIRECT_URI'),
                code,
            });

            return tokens;
        } catch (error) {
            this.logger.error(error, loggerContext);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}