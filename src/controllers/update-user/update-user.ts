import { User } from "../../Models/User";
import { HttpResponse, HttpRequest, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController{
    constructor(private readonly updateUserRepository: IUpdateUserRepository){}
    
    async handle(httpRequest: HttpResponse<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body

            if(!body){
                return{
                    statusCode: 400,
                    body: "Missing fields"
                };
            }

        if(!id){
            return {
                statusCode: 400,
                body:"Missing user id",
            };
        }
        const allowedFieldsToUpdate: (keyof UpdateUserParams)[]= [
            "firstName",
            "lastName",
            "email",
        ];
        const someFieldIsNotAllowedToUpdate = Object.keys(body)
        .some( key => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams));

        if(someFieldIsNotAllowedToUpdate){
            return{
                statusCode: 400,
                body: "Você informou algo campo inválido!"
            };
        }
        const user = await this.updateUserRepository.updateUser(id, body);
        return{
            statusCode: 200,
            body: user
        };
        } catch (error) {
            return{
                statusCode:500,
                body: "Algo deu errado tente mas tarde!."
            };
        }
    }

}