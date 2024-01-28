import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentStatusQueryDto {
    @ApiProperty({
        example: '2315',
        description: 'ID аккаунта ',
    })
    @IsString()
    @IsNotEmpty()
    readonly accountId: string;
}