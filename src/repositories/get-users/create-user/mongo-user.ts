import { User } from "../../../Models/User";
import { CreateUserParams, ICreateUserRepository } from "../../../controllers/create-user/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoCreateUserRepository implements ICreateUserRepository{
     async createUser(params: CreateUserParams): Promise<User> {

      const { insertedId} = await MongoClient.db.collection('client').insertOne(params);
      const user = await  MongoClient.db.collection<Omit<User, "id">>('client').findOne({_id:insertedId});
      if(!user){
        throw new Error('Usuario não encontrado')
      }
      const { _id, ...rest} = user;
      return {id: _id.toHexString(),...rest};
    }

}