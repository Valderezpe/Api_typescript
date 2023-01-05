import { IController } from "../protocols";
import { IUsersRepository } from "./protocols";

export class GetUsersController implements IController {
    static handle() {
        throw new Error("Method not implemented.");
    }
constructor( private readonly UsersRepository: IUsersRepository){ }
     async handle(){

       try {
        const users = await this.UsersRepository.getUsers();
        
        return{
            statusCode: 200,
            body:users
        };
       } catch (error) {
        return {
            statusCode: 500, 
            body: "sorry not possivel acess"
        };
        
       }
    
    }
}
