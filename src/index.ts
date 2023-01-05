import express from "express";
import {config} from 'dotenv';
import {GetUsersController} from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/get-users/create-user/mongo-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoDeleteUserRepositoty } from "./repositories/get-users/delete-user/mongo-delete.user";
import { DeleteUserController } from "./controllers/delete-user/delete.user";
import { MongoUpdateUserRepository } from "./repositories/get-users/updade-user/mongo-update-user";



const main = async() =>{
    config();

    const app = express();
    app.use(express.json());
    
    await MongoClient.connect();

    app.get("/client", async (req, res)=>{
        const mongoGetUsersRepository = new MongoGetUsersRepository();
        // const mysqlGetUsersRepository = new MysqlGetUsersRepository();
        
        const getUsersController = new GetUsersController(mongoGetUsersRepository);
        
        const { body, statusCode } = await getUsersController.handle();
        
         res.status(statusCode).send(body);
    });

    app.post("/client", async(req, res) =>{
        const mongoCreateUserRepository = new MongoCreateUserRepository();

        const createUserController = new CreateUserController(mongoCreateUserRepository);

        const {body,statusCode} = await createUserController.handle({
            body: req.body,
        });
        res.status(statusCode as any).send(body);
    });

    app.patch("/client/:id", async (req, res) =>{
        const mongoUpdateUserRepository = new MongoUpdateUserRepository()
        const updateUserController = new UpdateUserController(mongoUpdateUserRepository)

        const {body,statusCode} = await updateUserController.handle({
            body: req.body,
            params:req.params,
        });

        res.status(statusCode as any).send(body);
    });

    
    app.delete("/client/:id", async (req, res) =>{
        const mongoDeleteUserRepository = new MongoDeleteUserRepositoty();

        const deleteUserController = new DeleteUserController (mongoDeleteUserRepository)

        const {body,statusCode} = await deleteUserController.handle({
            params:req.params,
        });

        res.status(statusCode as any).send(body);
    })
    const port = process.env.PORT || 9000;
    app.listen(port,() => console.log(`listening on ${port}!`));
}; 
main();
