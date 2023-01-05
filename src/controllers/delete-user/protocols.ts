import { User } from "../../Models/User";

export interface IDeleteUserRepository {
    delete(id: string): Promise<User>;
}