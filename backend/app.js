import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import accountRouter from "./routes/accounts.js";
import userRouter from "./routes/users.js";
import loginUser from "./controller/auth.js";
import { Server } from "socket.io";
import http from "http";
import chatServer from "./controller/chatserver.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Create an HTTP server using the existing Express app
const server = http.createServer(app);

// Create a new instance of Socket.io by passing the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this to your frontend URL
    methods: ["GET", "POST"]
  }
});

// Set up your Socket.io logic using the 'io' instance
chatServer(io);

// Define your other routes and middleware here
app.use('/accounts', accountRouter);
app.use('/users', userRouter);
app.use('/login', loginUser);

// Start the server
server.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
