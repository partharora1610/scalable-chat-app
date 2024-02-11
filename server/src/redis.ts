import Redis from "ioredis";
import RedisStore from "connect-redis";

const redisClient = new Redis();

export default redisClient;
