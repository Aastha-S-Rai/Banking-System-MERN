import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import accountRouter from "./routes/accounts.js";
import userRouter from "./routes/users.js";
import loginUser from "./controller/auth.js"

const app = express();
const port = 4000;

const corsOptions = {
  origin: "https://banking-system-byaastha.onrender.com", // frontend URI (ReactJS)
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/accounts', accountRouter);
app.use('/users', userRouter);
app.use('/login', loginUser);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});