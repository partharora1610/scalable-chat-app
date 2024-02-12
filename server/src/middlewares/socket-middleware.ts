import { Socket } from "socket.io";
import redisClient from "../redis";

const socketAuthorization = async (socket: Socket, next: any) => {
  try {
    // @ts-ignore
    if (!socket.request.session || !socket.request.session.user) {
      console.log("Not authorized from the socket middleware");
      throw new Error("Not authorized");
    }

    // @ts-ignore
    socket.user = { ...socket.request.session.user };

    // @ts-ignore
    redisClient.hset(
      // @ts-ignore
      `userId:${socket.user.username}`,
      // @ts-ignore
      "userId",
      // @ts-ignore
      socket.user.userId
    );

    const friends = await redisClient.lrange(
      // @ts-ignore
      `friends:${socket.user.username}`,
      0,
      -1
    );
    socket.emit("friends_list", friends);

    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
};

export default socketAuthorization;
