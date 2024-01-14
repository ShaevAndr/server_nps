import { LoggerInterface } from './logger.interface';
import { LoggerService } from '@nestjs/common';
export declare class Logger implements LoggerInterface, LoggerService {
    private readonly consoleDateFormat;
    private readonly outerLogger;
    info(message: string, ...args: unknown[]): void;
    warn(message: string, ...args: unknown[]): void;
    error(message: string, ...args: unknown[]): void;
    debug(message: string, ...args: unknown[]): void;
    log(message: string, ...args: unknown[]): void;
}
