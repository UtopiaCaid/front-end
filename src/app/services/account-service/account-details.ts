import { AccountRole } from "./account-role";

export interface AccountDetails {
    accountNumber: number,
    email: string,
    dateCreated: Date,
    role: AccountRole,
    username: string,
}