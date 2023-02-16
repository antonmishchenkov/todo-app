import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./db.js";
import {router as userRouter} from "./src/routes/userRoutes.js";
import {router as tasksRouter} from "./src/routes/tasksRoutes.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import {
    User,
    Token,
    Tasks
} from './src/models/models.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/api", tasksRouter);

app.use(errorMiddleware);

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => console.log("Server successfully started at: " + PORT));
    } catch (err) {
        console.log(err);
    }
}

start()
    .then(() => console.log("server started"))
    .catch(err => console.log(err))
