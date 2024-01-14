import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountUninstallDto {
    @ApiProperty({ example: 'asda12a', description: 'Уникальный UUID виджета' })
    @IsString()
    @IsNotEmpty()
    readonly client_uuid: string;

    @ApiProperty({ example: '35870912', description: 'Уникальный ID аккаунта' })
    @IsString()
    @IsNotEmpty()
    readonly account_id: string;
}