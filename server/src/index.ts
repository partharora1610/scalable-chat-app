import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import helmet from "helmet";
import authRouter from "./routes/authRouter";
import sessionMiddleware, { wrap } from "./middlewares/session-middleware";

dotenv.config();

const app = express();

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USING EXPRESS SESSION MIDDLEWARE BOTH ON EXPRESS AND SOCKET.IO SERVER
app.use(sessionMiddleware);

io.use(wrap(sessionMiddleware));

io.on("connect", (socket) => {
  console.log(socket.id);
  // @ts-ignore
  console.log(socket.request.session);
});

// I am not getting the session.user.username here ?? lets us inveStigate why  ??

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
