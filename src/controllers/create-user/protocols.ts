import { User } from "../../Models/User";
import { HttpRequest, HttpResponse } from "../protocols";


export interface ICreateUserController {
    handle(HttpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>>;
    
}
export interface CreateUserParams{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface ICreateUserRepository{
    createUser(params: CreateUserParams): Promise<User>;
}