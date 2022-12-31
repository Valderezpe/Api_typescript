import { User } from "../../Models/User";
import { HttpResponse } from "../protocols";

 export interface IUsersController {
    handle(): Promise <HttpResponse<User []>>;
}

export interface IUsersRepository{
    getUsers(): Promise<User[]>
}
