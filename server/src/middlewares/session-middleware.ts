import RedisStore from "connect-redis";
import session from "express-session";
import redisClient from "../redis";

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
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
  },
});

export const wrap = (middleware: any) => (socket: any, next: any) => {
  console.log("wrap middleware");
  return middleware(socket.request, {}, next);
};

// const wrap = (expressMiddleware) => (socket, next) =>
//   expressMiddleware(socket.request, {}, next);

export default sessionMiddleware;
