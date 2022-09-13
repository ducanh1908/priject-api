import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Request, Response } from "express";
import { router } from './src/routes/routes';
import bodyParser from "body-parser";
import cors from "cors"
const app = express();
dotenv.config();

const DB_URL = `${process.env.MONGO_URL}`;
mongoose.connect(DB_URL).then(()=> {
    console.log("Connected to MongoDB")
})
.catch(err => console.log("MongoDB error: " + err) )
app.use(cors());
app.use(bodyParser.json());
app.use("",router)

app.listen(`${process.env.PORT}`, () => {
    console.log(`Express server listening on ${process.env.PORT}`);
})