import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import accountRouter from "./routes/accounts.js";
import userRouter from "./routes/users.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', accountRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});