import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CustomFieldDto {

    @ApiProperty({ example: 'Доп услуги', description: 'Название кастомного поля' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: '777', description: 'id поля' })
    @Transform((value) => Number(value))
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({ example: '123', description: 'Id аккаунта' })
    @Transform((value) => Number(value))
    @IsNotEmpty()
    readonly account_id: number;

    @ApiProperty({ example: 'checkbox', description: 'Тип поля' })
    @IsString()
    @IsNotEmpty()
    readonly type: string;

}

export class CustomFieldsDto {
    @ApiProperty({ example: 'Array', description: 'Массив кастомных полей' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CustomFieldDto)
    @IsNotEmpty()
    readonly custom_fields: CustomFieldDto[];

}

