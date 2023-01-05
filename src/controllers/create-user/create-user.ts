import validator from 'validator'
import { User } from "../../Models/User";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams,ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from '../helpers';

export class CreateUserController implements IController {
    constructor(private readonly createUserRepository: ICreateUserRepository){}
   async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>> {
    
    try {

        // verifgicar os campos obrigatórios..
        const requiredFields = [ "firstName", "lastName", "emnail", "password" ];

        for(const field of requiredFields) {
         if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length){
            return badRequest(`Field ${field} is required`);
         }
        }

        //verificar se email é válido..
        const emailIsValid = validator.isEmail(httpRequest.body!.email);

        if (!emailIsValid){
            return badRequest( "E-mail is validad");
        }
        
        const user = await this.createUserRepository.createUser(httpRequest.body!)
        return  created<User>(user);
    } catch (error) {
        return serverError();
        
    }
     
    }
    
}