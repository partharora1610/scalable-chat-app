"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const helmet_1 = __importDefault(require("helmet"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = __importDefault(require("./redis"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = require("http").createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
let redisStore = new connect_redis_1.default({
    client: redis_1.default,
    prefix: "sess:",
    disableTouch: false,
});
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production",
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
}));
io.on("connect", () => {
    console.log("Io connected!!");
});
app.use("/api/auth", authRouter_1.default);
app.get("/", (req, res) => {
    res.send("Hello World");
});
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
