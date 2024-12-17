import express from "express";
import cors from "cors";
import router from "./router/routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectionToDatabase from "./database/connection.js";

dotenv.config();

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

connectionToDatabase()

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server has started at PORT ${PORT}`);
})