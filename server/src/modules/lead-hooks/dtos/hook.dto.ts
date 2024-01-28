import { IsNotEmpty, IsString } from "class-validator";

export class AccountDto {
    @IsNotEmpty()
    readonly account_id: number

    @IsNotEmpty()
    @IsString()
    readonly subdomain: string
}

export class HookDto {
    @IsNotEmpty()
    readonly account: AccountDto
}
