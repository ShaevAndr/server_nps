declare class Account {
    readonly id: number;
    readonly subdomain: string;
}
export declare class LeadsDto {
    readonly delete: Lead[];
}
export declare class DeleteHookDto {
    readonly account: Account;
    readonly leads: LeadsDto;
}
declare class Lead {
    readonly id: number;
}
export {};
