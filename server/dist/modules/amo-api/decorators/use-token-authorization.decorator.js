"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseTokenAuthorization = void 0;
const axios_1 = require("axios");
const axios_2 = require("axios");
const mongoose = require("mongoose");
const account_models_1 = require("../../account/models/account.models");
const account_repository_1 = require("../../account/account.repository");
const common_1 = require("@nestjs/common");
const promises_1 = require("node:timers/promises");
const logger_service_1 = require("../../../core/logger/logger.service");
const config_1 = require("@nestjs/config");
const path = require("path");
const process = require("process");
const dotenv = require("dotenv");
dotenv.config({
    path: path.resolve(__dirname, '..', '..', '..', '..', `.env`),
});
mongoose
    .connect(process.env.MONGO_CONNECT, {
    dbName: process.env.DB_NAME,
})
    .then();
const accountModel = mongoose.model(account_models_1.Account.name, account_models_1.AccountSchema);
const ONE_SECOND_IN_MILLISECONDS = 1000;
async function refreshAccessToken(refreshToken, accountId, subdomain) {
    const config = new config_1.ConfigService();
    const logger = new logger_service_1.Logger();
    return axios_1.default.post(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
        client_id: config.get('CLIENT_UUID'),
        client_secret: config.get('CLIENT_SECRET'),
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        redirect_uri: config.get('REDIRECT_URI'),
    })
        .then(async (res) => {
        logger.warn('Token updated successfully');
        const token = res.data;
        await accountModel.findOneAndUpdate({ accountId: accountId }, { refreshToken: token.refresh_token, accessToken: token.access_token });
        return token.access_token;
    })
        .catch((err) => {
        logger.error('Failed to refresh token');
        logger.error(err);
        logger.error(err.response);
        logger.error(err.response.data);
        return '';
    });
}
function UseTokenAuthorization(maxRetries = 2) {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const logger = new logger_service_1.Logger();
        const accountRepository = new account_repository_1.AccountRepository(accountModel);
        const loggerContext = `${UseTokenAuthorization.name}/${originalMethod.name}`;
        descriptor.value = async function (authDto, ...args) {
            let currentTry = 1;
            while (currentTry <= maxRetries) {
                try {
                    return await originalMethod.apply(this, [authDto, ...args]);
                }
                catch (error) {
                    const accountInfo = await accountRepository.getAccountById(authDto.accountId);
                    const errorStatus = error.response?.status;
                    switch (errorStatus) {
                        case axios_2.HttpStatusCode.Unauthorized: {
                            if (currentTry <= maxRetries) {
                                logger.warn(`${error.message} \n Try to update the tokens and send the request again \n Attempt: ${currentTry}`, loggerContext, authDto.subdomain);
                                const updatedToken = await refreshAccessToken(accountInfo.refreshToken, accountInfo.accountId, authDto.subdomain);
                                authDto.token = updatedToken;
                                currentTry++;
                            }
                            else {
                                logger.error('Reached maximum retry count. Could not refresh tokens.', loggerContext, authDto.subdomain);
                                throw new common_1.HttpException(error.response.data, common_1.HttpStatus.UNAUTHORIZED);
                            }
                            break;
                        }
                        case axios_2.HttpStatusCode.BadRequest:
                        case axios_2.HttpStatusCode.NotFound: {
                            if (currentTry <= maxRetries) {
                                logger.warn(`${error.message} \n Try to send the request again \n Attempt: ${currentTry}`, loggerContext, authDto.subdomain);
                                currentTry++;
                            }
                            else {
                                logger.error('Reached maximum retry count. Could not refresh tokens.', loggerContext, authDto.subdomain);
                                throw new common_1.HttpException(error.response.data, errorStatus === axios_2.HttpStatusCode.NotFound ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.BAD_REQUEST);
                            }
                            break;
                        }
                        case axios_2.HttpStatusCode.TooManyRequests: {
                            if (currentTry <= maxRetries) {
                                logger.warn(`${error.message} \n Try to send the request again \n Attempt: ${currentTry}`, loggerContext, authDto.subdomain);
                                await (0, promises_1.setTimeout)(ONE_SECOND_IN_MILLISECONDS);
                                currentTry++;
                            }
                            else {
                                logger.error('Reached maximum retry count. Could not refresh tokens.', loggerContext, authDto.subdomain);
                                throw new common_1.HttpException(error.response.data, common_1.HttpStatus.TOO_MANY_REQUESTS);
                            }
                            break;
                        }
                        default: {
                            if (currentTry <= maxRetries) {
                                logger.warn(`${error.message} \n Try to send the request again \n Attempt: ${currentTry}`, loggerContext, authDto.subdomain);
                                currentTry++;
                            }
                            else {
                                logger.error(error.message, loggerContext, authDto.subdomain);
                                throw new common_1.HttpException(error.response.data, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                            }
                        }
                    }
                }
            }
        };
        return descriptor;
    };
}
exports.UseTokenAuthorization = UseTokenAuthorization;
//# sourceMappingURL=use-token-authorization.decorator.js.map