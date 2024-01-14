import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
    @ApiProperty({ example: 'myaccount', description: 'Субдомен amoCrm' })
    @IsString()
    @IsNotEmpty()
    readonly subdomain: string;

    @ApiProperty({ example: '123', description: 'Id аккаунта' })
    @IsNumber()
    @IsNotEmpty()
    readonly account_id: number;

}