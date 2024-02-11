import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import helmet from "helmet";
import authRouter from "./routes/authRouter";
import session from "express-session";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import redisClient from "./redis";

dotenv.config();

const app = express();

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

//
declare module "express-session" {
  interface SessionData {
    user: {
      username: string;
      id: number;
    };
  }
}

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:",
  disableTouch: false,
});

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: redisStore as any,
    secret: process.env.SESSION_SECRET!,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);

io.on("connect", () => {
  console.log("Io connected!!");
});

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
