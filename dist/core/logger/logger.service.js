"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const log4js = require("log4js");
const dayjs = require("dayjs");
const chalk = require("chalk");
const common_1 = require("@nestjs/common");
const app_constants_1 = require("../constants/app.constants");
let Logger = class Logger {
    constructor() {
        this.outerLogger = log4js.configure({
            appenders: {
                everything: {
                    type: 'file',
                    filename: './logs/logs.log',
                    maxLogSize: app_constants_1.MAX_LOG_FILE_SIZE,
                    layout: {
                        type: 'pattern',
                        pattern: '%d %p %f:%l %m%n',
                    },
                },
            },
            categories: {
                default: {
                    appenders: ['everything'],
                    level: 'debug',
                    enableCallStack: true,
                },
            },
        }).getLogger();
    }
    info(message, ...args) {
        console.info(`${dayjs().format(this.consoleDateFormat)}`, chalk.bgGreen('INFO'), chalk.green(message), ...args);
        this.outerLogger.info(message, ...args);
    }
    warn(message, ...args) {
        console.warn(`${dayjs().format(this.consoleDateFormat)}`, chalk.bgYellow('WARN'), chalk.yellow(message), ...args);
        this.outerLogger.warn(message, ...args);
    }
    error(message, ...args) {
        console.error(`${dayjs().format(this.consoleDateFormat)}`, chalk.bgRed('ERROR'), chalk.red(message), ...args);
        this.outerLogger.error(message, ...args);
    }
    debug(message, ...args) {
        console.debug(`${dayjs().format(this.consoleDateFormat)}`, chalk.bgBlue('DEBUG'), chalk.blue(message), ...args);
        this.outerLogger.debug(message, ...args);
    }
    log(message, ...args) {
        console.log(`${dayjs().format(this.consoleDateFormat)}`, chalk.bgMagenta('LOG'), chalk.magenta(message), ...args);
    }
};
exports.Logger = Logger;
exports.Logger = Logger = __decorate([
    (0, common_1.Injectable)()
], Logger);
//# sourceMappingURL=logger.service.js.map