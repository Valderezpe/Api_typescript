import { User } from "../../Models/User";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserController{
    handle(httpResponse: HttpRequest<any>): Promise<HttpResponse<User>> 
}
export interface IDeleteUserRepository {
    [x: string]: any;
    delete(id: string): Promise<User>;
}