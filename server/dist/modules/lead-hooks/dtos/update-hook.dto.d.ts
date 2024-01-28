export declare class HookAccountDto {
    readonly id: number;
    readonly subdomain: string;
}
export declare class UpdateHookDto {
    readonly account: HookAccountDto;
    readonly leads: Leads;
    readonly contacts: Contacts;
}
declare class Lead {
    readonly id: number;
}
declare class Contact {
    readonly account_id: number;
    readonly id: number;
    readonly name: string;
    readonly type: string;
}
declare class Leads {
    readonly update: Lead[];
}
declare class Contacts {
    readonly update: Contact[];
}
export {};
