import { User } from "../../Models/User";
import { badRequest, ok, serverError } from "../helpers";
import { HttpResponse, HttpRequest, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController{
    constructor(private readonly updateUserRepository: IUpdateUserRepository){}
    
    async handle(httpRequest: HttpResponse<UpdateUserParams>): Promise<HttpResponse<User | string>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body

            if(!body){
                return badRequest("missing fields");
            }

        if(!id){
            return badRequest ("missing id");
        }
        const allowedFieldsToUpdate: (keyof UpdateUserParams)[]= [
            "firstName",
            "lastName",
            "email",
        ];
        const someFieldIsNotAllowedToUpdate = Object.keys(body)
        .some( key => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams));

        if(someFieldIsNotAllowedToUpdate){
            return badRequest("Some received fields is note allowed");
        }
        const user = await this.updateUserRepository.updateUser(id, body);
        return ok<User>(user);
        } catch (error) {
            return serverError();
        }
    }

}