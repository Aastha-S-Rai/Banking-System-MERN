import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const port = 6000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.send('Hello World!');
});

app.use('/users');
app.use('/users');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});