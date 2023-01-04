import { User } from "../../Models/User";
import { IUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";

export class MongoGetUsersRepository implements IUsersRepository{
     async getUsers(): Promise<User[]> {
        const users = await MongoClient.db
        .collection<Omit<User, "id">>('users')
        .find({})
        .toArray();

        return users.map(({_id, ...rest}) =>({
            ...rest,
            id: _id.toHexString(),
        }));

      
    }
}
