import { User } from "../../Models/User";
import { IUsersRepository } from "../../controllers/get-users/protocols";

export class MongoGetUsersRepository implements IUsersRepository{
     async getUsers(): Promise<User[]> {
        return [{
            firstName: 'Nicole',
            lastName: 'Valderez',
            email: 'val@gmail.com.br',
            pasword:"123",
        },
    ];
    }
}

export class MysqlGetUsersRepository implements IUsersRepository{
    async getUsers(): Promise<User[]> {
       return [{
           firstName: 'Nicole',
           lastName: 'Valderez',
           email: 'val@gmail.com.br',
           pasword:"123",
       },
   ];
   }
}