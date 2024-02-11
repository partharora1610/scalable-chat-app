"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = void 0;
const connect_redis_1 = __importDefault(require("connect-redis"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("../redis"));
dotenv_1.default.config();
let redisStore = new connect_redis_1.default({
    client: redis_1.default,
    prefix: "sess:",
    disableTouch: false,
});
const sessionMiddleware = (0, express_session_1.default)({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
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
const wrap = (middleware) => (socket, next) => {
    console.log("wrap middleware");
    return middleware(socket.request, {}, next);
};
exports.wrap = wrap;
exports.default = sessionMiddleware;
