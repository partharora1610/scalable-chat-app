import RedisStore from "connect-redis";
import dotenv from "dotenv";
import session from "express-session";
import redisClient from "../redis";

dotenv.config();

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:",
  disableTouch: false,
});

declare module "express-session" {
  interface SessionData {
    user: {
      username: string;
      id: number;
      userId: string;
    };
  }
}

const sessionMiddleware = session({
  store: redisStore as any,
  secret: process.env.SESSION_SECRET!,
  name: "sid",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT === "production",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
  },
});

export const wrap = (middleware: any) => (socket: any, next: any) => {
  return middleware(socket.request, {}, next);
};

export default sessionMiddleware;
