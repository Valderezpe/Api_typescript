import express from "express";
import {config} from 'dotenv'

config();

const app = express()

const port = process.env.PORT || 9000


app.get('/',(req, res)=>{
    res.send("endPoint ok");
});
app.listen(port,() => console.log(`listening on ${port}!`));