import { Socket } from "socket.io";
import redisClient from "../redis";
import { parseFriendList } from "../controllers/socket";

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
    socket.join(socket.user.userId);

    // @ts-ignore
    redisClient.hset(
      // @ts-ignore
      `userId:${socket.user.username}`,
      // @ts-ignore
      "userId",
      // @ts-ignore
      socket.user.userId,
      "connected",
      "true"
    );

    const friendList = await redisClient.lrange(
      // @ts-ignore
      `friends:${socket.user.username}`,
      0,
      -1
    );

    const friends = await parseFriendList(friendList);

    const friendRooms = friends.map(
      (friend: { username: string; userId: string }) => friend.userId
    );

    if (friendRooms.length > 0) {
      // cheching if the friends are there
      // @ts-ignore
      socket.to(friendRooms).emit("connected", false, socket.user.username);
    }

    // ??
    socket.emit("friends_list", friends);

    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
};

export default socketAuthorization;
