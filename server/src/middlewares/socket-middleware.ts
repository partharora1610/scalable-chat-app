import { Socket } from "socket.io";
import redisClient from "../redis";
import { parseFriendList } from "../controllers/socket";
import { parseMessages } from "../utils";

const socketAuthorization = async (socket: Socket, next: any) => {
  try {
    if (!socket.request.session || !socket.request.session.user) {
      console.log("Not authorized from the socket middleware");
      throw new Error("Not authorized");
    }

    socket.user = { ...socket.request.session.user };

    socket.join(socket.user.userId);

    redisClient.hset(
      `userId:${socket.user.username}`,
      "userId",
      socket.user.userId,
      "connected",
      "true"
    );

    const friendList = await redisClient.lrange(
      `friends:${socket.user.username}`,
      0,
      -1
    );

    const friends = await parseFriendList(friendList);

    const friendRooms = friends.map(
      (friend: { username: string; userId: string }) => friend.userId
    );

    if (friendRooms.length > 0)
      socket.to(friendRooms).emit("connected", false, socket.user.username);

    socket.emit("friends_list", friends);

    const messagesStr = await redisClient.lrange(
      `chat:${socket.user.userId}`,
      0,
      -1
    );

    const globalMessagesStr = await redisClient.lrange(`chat:global`, 0, -1);
    console.log(globalMessagesStr);

    const messages = parseMessages(messagesStr);
    const globalMessages = parseMessages(globalMessagesStr);
    console.log(globalMessages);

    socket.emit("messages_list", messages);
    socket.emit("message_global_list", globalMessages);

    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
};

export default socketAuthorization;
