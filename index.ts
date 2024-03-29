import express from "express";
import cors from "cors";
import DatabaseConnect from "./src/models/database-connect";
import bodyParser from "body-parser";
import adminApiRouter from "./src/routers/adminRouter/admin.router";
import authRouter from "./src/routers/authRouter/authRouter";
import userRouter from "./src/routers/userRouter/userRouter";
import songRouter from "./src/routers/songRouter/songRouter";
import sseRouter from "./src/routers/sseRouter";
import * as process from "process";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/sse', sseRouter);
app.use('/admin', adminApiRouter)
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/song', songRouter);

DatabaseConnect
    .connectDB()
    .then(res => console.log('Connect DB successfully!'))
    .catch(err => console.log('DB connect failed'));

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});
