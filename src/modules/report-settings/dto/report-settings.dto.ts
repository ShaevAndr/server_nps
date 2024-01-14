import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportSettingsDto {
    @ApiProperty({ example: 'Главная настройка!', description: 'Название настройки' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 'myaccount', description: 'Субдомен amoCrm' })
    @IsString()
    @IsNotEmpty()
    readonly subdomain: string;

    @ApiProperty({ example: 'myaccount', description: 'Субдомен amoCrm' })
    @IsNumber()
    @IsNotEmpty()
    readonly account_id: number;

    @ApiProperty({ example: 'Имя сделки', description: 'Выбор: "имя сделки", "имя компании",  "имя контакта"' })
    @IsString()
    @IsNotEmpty()
    readonly Leads: string;

    @ApiProperty({ example: 'Ответственный за сделку', description: 'Выбор поля ответственного' })
    @IsString()
    @IsNotEmpty()
    readonly Responsible: string;

    @ApiProperty({ example: 'Продукт', description: 'Выбор поля продукта' })
    @IsString()
    @IsNotEmpty()
    readonly ProductGroup: string;

    @ApiProperty({ example: 'Дата создания сделки', description: 'Выбор поля с типом "время"' })
    @IsString()
    @IsNotEmpty()
    readonly EvaluationDate: string;

    @ApiProperty({ example: 'Бал по проекту', description: 'Выбор поля относящегося к NPS' })
    @IsString()
    @IsNotEmpty()
    readonly Nps: string;

    @ApiProperty({ example: 'Комментарий', description: 'Текстовые поля' })
    @IsString()
    @IsNotEmpty()
    readonly Comment: string;
}