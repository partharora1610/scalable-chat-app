import { NextFunction, Request, Response } from "express";
import redisClient from "../redis";

export const RateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip;

  const response = await redisClient.multi().incr(ip!).expire(ip!, 60).exec();

  // type gaurd
  if (!response) {
    return res.status(429).json({ message: "Too many requests" });
  }

  // TODO => CHNAGE THE TYPE
  if ((response[0][1] as number) > 10) {
    return res.status(429).json({ message: "THAM JAA BHAII!! ARAAM SE" });
  }

  next();
};
