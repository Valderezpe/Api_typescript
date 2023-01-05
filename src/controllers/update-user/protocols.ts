import { User } from "../../Models/User";
import { HttpResponse } from "../protocols";

export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface IUpdateUserController{
    handle(HttpRequest: HttpResponse<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
    updateUser( id: string, params: UpdateUserParams): Promise<User>;
}