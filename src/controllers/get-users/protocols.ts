import { User } from "../../Models/User";
export interface IUsersRepository{
    getUsers(): Promise<User[]>
}
