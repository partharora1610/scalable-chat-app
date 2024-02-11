"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const session_middleware_1 = __importStar(require("./middlewares/session-middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = require("http").createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// USING EXPRESS SESSION MIDDLEWARE BOTH ON EXPRESS AND SOCKET.IO SERVER
app.use(session_middleware_1.default);
io.use((0, session_middleware_1.wrap)(session_middleware_1.default));
io.on("connect", (socket) => {
    console.log(socket.id);
    // @ts-ignore
    console.log(socket.request.session);
});
// I am not getting the session.user.username here ?? lets us inveStigate why  ??
app.use("/api/auth", authRouter_1.default);
app.get("/", (req, res) => {
    res.send("Hello World");
});
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
