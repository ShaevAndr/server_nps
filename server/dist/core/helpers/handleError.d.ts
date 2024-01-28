import { HttpException } from '@nestjs/common';
declare const handleError: (error: unknown, message?: string) => HttpException;
export default handleError;
