/// <reference path="./index.d.ts" />
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import helmet from "helmet";
import authRouter from "./routes/authRouter";
import sessionMiddleware, { wrap } from "./middlewares/session-middleware";
import socketAuthorization from "./middlewares/socket-middleware";
import {
  addFriend,
  disconnectUser,
  messageDmHandler,
} from "./controllers/socket";

dotenv.config();

const app = express();

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

io.use(wrap(sessionMiddleware));
io.use(socketAuthorization);

io.on("connect", (socket) => {
  console.log("socket connected!!");

  socket.on("add_friend", (data, cb) => {
    addFriend({ socket, data, cb });
  });

  socket.on("disconnecting", () => {
    disconnectUser(socket);
  });

  socket.on("message_dm", (data) => {
    messageDmHandler({ data, socket });
  });
});

app.use("/api/auth", authRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
