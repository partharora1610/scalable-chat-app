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

    if (friendRooms.length > 0)
      // @ts-ignore
      socket.to(friendRooms).emit("connected", false, socket.user.username);

    socket.emit("friends_list", friends);

    const messagesStr = await redisClient.lrange(
      // @ts-ignore
      `chat:${socket.user.userId}`,
      0,
      -1
    );

    const messages = parseMessages(messagesStr);

    socket.emit("messages_list", messages);

    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
};

export const parseMessages = (messages: string[]) => {
  const parsedMessages = messages.map((m: string) => {
    const array = m.split(".");
    return {
      to: array[0],
      from: array[1],
      message: array[2],
    };
  });

  console.log(parsedMessages);

  return parsedMessages;
};

export default socketAuthorization;
