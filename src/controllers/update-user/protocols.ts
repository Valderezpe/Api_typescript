import { User } from "../../Models/User";

export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
    email?: string;
}
export interface IUpdateUserRepository {
    updateUser( id: string, params: UpdateUserParams): Promise<User>;
}