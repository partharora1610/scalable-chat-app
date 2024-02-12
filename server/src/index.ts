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
    origin: "http://localhost:5173",
    // This was the error....
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

io.on("connect", (socket) => {
  console.log(socket.id);
  // @ts-ignore
  console.log(socket.request.session.user);
});

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
