import { User } from "../../Models/User";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
    constructor (private readonly deleteUserRepository: IDeleteUserRepository) {}

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest?.params.id
            if(!id){
                return{
                    statusCode: 404,
                    body: "id Obrigatório!"
                };
            }
            const user = await this.deleteUserRepository.deleteUser(id);
                return{
                    statusCode:200,
                    body: user,
                }

        } catch (error) {
            return {
                statusCode: 500,
                body: "Algo deu arrado tente mas tarde!",
            }
        }
    }

}