"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthChecker = void 0;
const axios_1 = require("axios");
const axios_2 = require("axios");
const mongoose = require("mongoose");
const account_models_1 = require("../account/models/account.models");
const account_repository_1 = require("../account/account.repository");
const common_1 = require("@nestjs/common");
const promises_1 = require("node:timers/promises");
const logger_service_1 = require("../../core/logger/logger.service");
const config_1 = require("@nestjs/config");
const path = require("path");
const process = require("process");
const dotenv = require("dotenv");
dotenv.config({
    path: path.resolve(__dirname, '..', '..', '..', '..', `.${process.env.NODE_ENV}.env`),
});
mongoose
    .connect(process.env.MONGO_CONNECT, {
    dbName: process.env.MONGO_NAME,
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
        logger.warn('Токен успешно обновлён');
        const token = res.data;
        await accountModel.findOneAndUpdate({ id: accountId }, { refreshToken: token.refresh_token, accessToken: token.access_token });
        return token.access_token;
    })
        .catch((err) => {
        logger.error('Ошибка при обновлении токена');
        logger.error(err.response.data);
        return '';
    });
}
function AuthChecker(maxRetries = 5) {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const logger = new logger_service_1.Logger();
        const accountRepository = new account_repository_1.AccountRepository(accountModel);
        const loggerContext = `${AuthChecker.name}/${originalMethod.name}`;
        descriptor.value = async function (authDto, ...args) {
            let currentTry = 1;
            while (currentTry <= maxRetries) {
                try {
                    return await originalMethod.apply(this, [authDto, ...args]);
                }
                catch (error) {
                    console.log(error);
                    const accountInfo = await accountRepository.getAccountById(authDto.accountId);
                    const errorStatus = error.response?.status;
                    switch (errorStatus) {
                        case axios_2.HttpStatusCode.Unauthorized: {
                            if (currentTry <= maxRetries) {
                                logger.warn(`${error.message} \n Попытка обновить токен и отправить запрос \n Попытка: ${currentTry}`, loggerContext, authDto.subdomain);
                                const updatedToken = await refreshAccessToken(accountInfo.refreshToken, accountInfo.accountId, authDto.subdomain);
                                authDto.token = updatedToken;
                                currentTry++;
                            }
                            else {
                                logger.error('Превышено число попыток. Не смогли обновить токен.', loggerContext, authDto.subdomain);
                                throw new common_1.HttpException(error.response.data, common_1.HttpStatus.UNAUTHORIZED);
                            }
                            break;
                        }
                        case axios_2.HttpStatusCode.BadRequest:
                        case axios_2.HttpStatusCode.NotFound: {
                            if (currentTry <= maxRetries) {
                                logger.warn(`${error.message} \n Попытка сделать запрос \n Попытка: ${currentTry}`, loggerContext, authDto.subdomain);
                                currentTry++;
                            }
                            else {
                                logger.error('Превышено число попыток. Не смогли обновить токен.', loggerContext, authDto.subdomain);
                                throw new common_1.HttpException(error.response.data, errorStatus === axios_2.HttpStatusCode.NotFound ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.BAD_REQUEST);
                            }
                            break;
                        }
                        case axios_2.HttpStatusCode.TooManyRequests: {
                            if (currentTry <= maxRetries) {
                                logger.warn(`${error.message} \n Попытка заного отправить запрос \n Попытка: ${currentTry}`, loggerContext, authDto.subdomain);
                                await (0, promises_1.setTimeout)(ONE_SECOND_IN_MILLISECONDS);
                                currentTry++;
                            }
                            else {
                                logger.error('Превышено число попыток. Не смогли обновить токен.', loggerContext, authDto.subdomain);
                                throw new common_1.HttpException(error.response.data, common_1.HttpStatus.TOO_MANY_REQUESTS);
                            }
                            break;
                        }
                        default: {
                            if (currentTry <= maxRetries) {
                                logger.warn(`${error.message} \n Попытка заного отправить запрос \n Attempt: ${currentTry}`, loggerContext, authDto.subdomain);
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
exports.AuthChecker = AuthChecker;
//# sourceMappingURL=useTokenAuthorization.decorator.js.map