import express from "express";
import { Register, Login } from "../controllers/auth";
import { RateLimiter } from "../middlewares/rate-limiter";

const authRouter = express.Router();

authRouter.post("/register", RateLimiter, Register);
authRouter.post("/login", RateLimiter, Login);

export default authRouter;
