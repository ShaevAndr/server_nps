export type SuccessTokenResponse = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
};
export type TokenPairsType = {
    token_type: 'Bearer';
    expires_in: 86400;
    access_token: string;
    refresh_token: string;
};
