import express from "express";
import { Register, Login, isUserLoggedIn } from "../controllers/auth";
import { RateLimiter } from "../middlewares/rate-limiter";

const authRouter = express.Router();

authRouter.post("/register", RateLimiter, Register);
authRouter.route("/login").get(isUserLoggedIn).post(RateLimiter, Login);

export default authRouter;
