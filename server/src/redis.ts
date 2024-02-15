import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URI);
redisClient.on("connect", () => {
  console.log("connected to redis");
});

export default redisClient;
