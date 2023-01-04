import validator from 'validator'
import { User } from "../../Models/User";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocols";

export class CreateUserController implements ICreateUserController {
    constructor(private readonly createUserRepository: ICreateUserRepository){}
   async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
    
    try {

        // verifgicar os campos obrigatórios..
        const requiredFields = [ "firstName", "lastName", "emnail", "password" ];

        for(const field of requiredFields) {
         if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length){
            return {
                statusCode: 400,
                body:`Field ${field} is required`,
            };
         }
        }

        //verificar se email é válido..
        const emailIsValid = validator.isEmail(httpRequest.body!.email);

        if (!emailIsValid){
            return{
                statusCode:400,
                body: "E-mail inválido!"
            }
        }
        
        const user = await this.createUserRepository.createUser(httpRequest.body!)
        return {
            statusCode: 200,
            body: user,
        }
    } catch (error) {
        return{
            statusCode: 500,
            body: "Erro ao carregar pagina!"
        }
        
    }
     
    }
    
}