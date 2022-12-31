import express from "express";
import {config} from 'dotenv';
import {GetUsersController} from "./controllers/get-users/get-users";
import { MongoGetUsersRepository, MysqlGetUsersRepository } from "./repositories/get-users/mongo-get-users";

config();

const app = express();

const port = process.env.PORT || 9000;


app.get("/client", async (req, res)=>{
// const mongoGetUsersRepository = new MongoGetUsersRepository();
const mysqlGetUsersRepository = new MysqlGetUsersRepository();

const getUsersController = new GetUsersController (mysqlGetUsersRepository);

const { body, statusCode } = await getUsersController.handle();

res.send(body).status(statusCode)
});

app.listen(port,() => console.log(`listening on ${port}!`));