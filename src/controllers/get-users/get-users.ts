import { User } from "../../Models/User";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import {  IUsersRepository } from "./protocols";

export class GetUsersController implements IController {
    static handle() {
        throw new Error("Method not implemented.");
    }
constructor( private readonly UsersRepository: IUsersRepository){ }
     async handle(): Promise<HttpResponse<User[] | string>>{

       try {
        const users = await this.UsersRepository.getUsers();
        
        return ok<User[]>(users);
       } catch (error) {
        return serverError();
        
       }
    
    }
}
