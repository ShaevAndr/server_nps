import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

class Account {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number

    @IsNotEmpty()
    @IsString()
    readonly subdomain: string
}
export class LeadsDto {
    @IsArray()
    @Type(() => Lead)
    @ValidateNested({ each: true })
    readonly delete: Lead[]
}


export class DeleteHookDto {
    @IsNotEmpty()
    readonly account: Account

    @IsNotEmpty()
    readonly leads: LeadsDto

}

class Lead {
    @IsNotEmpty()
    readonly id: number
}






