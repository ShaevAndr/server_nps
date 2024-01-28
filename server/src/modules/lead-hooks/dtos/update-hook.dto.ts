import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class HookAccountDto {
    @IsNotEmpty()
    readonly id: number

    @IsNotEmpty()
    @IsString()
    readonly subdomain: string
}


export class UpdateHookDto {
    @IsNotEmpty()
    readonly account: HookAccountDto

    readonly leads: Leads

    readonly contacts: Contacts
}

class Lead {
    @IsNotEmpty()
    readonly id: number
}

class Contact {
    @IsNumber()
    @IsNotEmpty()
    readonly account_id: number

    @IsNotEmpty()
    readonly id: number

    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    readonly type: string

}

class Leads {
    @IsArray()
    @Type(() => Lead)
    @ValidateNested({ each: true })
    readonly update: Lead[]
}
class Contacts {
    @IsArray()
    @Type(() => Contact)
    @ValidateNested({ each: true })
    readonly update: Contact[]
}


