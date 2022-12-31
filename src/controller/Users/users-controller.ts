import { IUsersController, IUsersRepository } from "./protocols";

export class UsersController implements IUsersController {
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
