import { ObjectId } from "mongodb";
import { User } from "../../../Models/User";
import { IDeleteUserRepository } from "../../../controllers/delete-user/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoDeleteUserRepositoty implements IDeleteUserRepository{
    async delete(id: string): Promise<User> {
        const user = await MongoClient.db.collection<Omit<User,"id">>("client").findOne({ _id: new ObjectId(id) });

        if(!user){
            throw new Error("User not found");
        }

       const {deletedCount} = await MongoClient.db.collection("client").deleteOne({_id: new ObjectId(id)});

       if(!deletedCount){
        throw new Error("Usuario not deleted");
       }
       const { _id, ...rest} = user;
       return{id: _id.toHexString(),...rest};

    }
}