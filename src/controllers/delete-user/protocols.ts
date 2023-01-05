import { User } from "../../Models/User";
export interface IDeleteUserRepository {
    [x: string]: any;
    delete(id: string): Promise<User>;
}