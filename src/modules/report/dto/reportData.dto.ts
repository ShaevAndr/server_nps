import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportData {
    @ApiProperty({ example: 'Главная настройка!', description: 'Название настройки' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 'Главная настройка!', description: 'Название настройки' })
    @IsString()
    @IsNotEmpty()
    readonly subdomain: string;

    @ApiProperty({ example: '123', description: 'Id аккаунта' })
    @IsNumber()
    @IsNotEmpty()
    readonly account_id: number;

}