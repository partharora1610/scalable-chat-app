import { Socket } from "socket.io";
import redisClient from "../redis";
import { FriendList, addFriendData } from "../types";

export const addFriend = async ({ socket, data, cb }: addFriendData) => {
  const { username } = data;

  const friendUser = await redisClient.hgetall(`userId:${username}`);

  if (!friendUser || !friendUser.userId) {
    cb({ error: "User not found", done: false });
    return;
  }

  if (friendUser.userId === socket.user.userId) {
    cb({ error: "You can't add yourself", done: false });
    return;
  }

  const currentFriends = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );

  if (currentFriends && currentFriends.indexOf(username) !== -1) {
    cb({ error: "You are already friends", done: false });
    return;
  }

  await redisClient.lpush(
    `friends:${username}`,
    [socket.user.username, socket.user.userId].join(".")
  );

  await redisClient.lpush(
    `friends:${socket.user.username}`,
    [username, friendUser.userId].join(".")
  );

  cb({
    error: "",
    done: true,
    data: {
      username: username,
      userId: friendUser.userId,
    },
  });
};

export const disconnectUser = async (socket: Socket) => {
  await redisClient.hset(
    `userId:${socket.user.username}`,
    "connected",
    "false"
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

  socket.to(friendRooms).emit("connected", false, socket.user.username);
};

export const parseFriendList = async (friendList: string[]) => {
  const newFriendList: FriendList[] = [];

  for (let friend of friendList) {
    const parsedFriend = friend.split(".");

    const friendConnected = await redisClient.hget(
      `userId:${parsedFriend[0]}`,
      "connected"
    );

    newFriendList.push({
      username: parsedFriend[0],
      userId: parsedFriend[1],
      connected: friendConnected === "true",
    });
  }

  return newFriendList;
};

export const messageGlobalHandler = async ({
  data,
  socket,
}: {
  data: {
    data: {
      message: string;
      from: string;
    };
  };
  socket: Socket;
}) => {
  const message = {
    to: "global",
    from: socket.user.userId,
    message: data.data.message,
    timestamp: Date.now(),
  };

  const messageString = [
    message.to,
    message.from,
    message.message,
    message.timestamp,
  ].join(".");

  await redisClient.lpush("chat:global", messageString);

  socket.to("global").emit("message_global", message);
};

export const messageDmHandler = async ({
  data,
  socket,
}: {
  data: {
    data: {
      message: string;
      to: string;
      from: string | null;
    };
  };
  socket: Socket;
}) => {
  const message = {
    to: data.data.to,
    from: socket.user.userId,
    message: data.data.message,
    timestamp: Date.now(),
  };

  const messageString = [
    message.to,
    message.from,
    message.message,
    message.timestamp,
  ].join(".");

  await redisClient.lpush(`chat:${message.to}`, messageString);
  await redisClient.lpush(`chat:${message.from}`, messageString);

  socket.to(message.to).emit("dm_server", message);
};
