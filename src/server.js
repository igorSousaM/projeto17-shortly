import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());


const port = process.env.PORT;

server.listen(4000, ()=>{console.log(`Server running at ${port} port`)})