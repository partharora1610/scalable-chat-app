"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const rate_limiter_1 = require("../middlewares/rate-limiter");
const authRouter = express_1.default.Router();
authRouter.post("/register", rate_limiter_1.RateLimiter, auth_1.Register);
authRouter.post("/login", rate_limiter_1.RateLimiter, auth_1.Login);
exports.default = authRouter;
