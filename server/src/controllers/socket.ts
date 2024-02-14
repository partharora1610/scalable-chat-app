import redisClient from "../redis";

interface addFriendData {
  data: {
    username: string;
  };
  cb: (arg: { error: string; done: boolean }) => void;
  socket: any;
}

export const addFriend = async ({ socket, data, cb }: addFriendData) => {
  const { username } = data;

  const friendUser = await redisClient.hgetall(`userId:${username}`);

  if (!friendUser) {
    cb({ error: "User not found", done: false });
    return;
  }

  if (friendUser.userId === socket.user.userId) {
    cb({ error: "You can't add yourself", done: false });
    return;
  }

  // getting the whole freidns list
  const currentFriends = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );

  if (currentFriends && currentFriends.indexOf(username) !== -1) {
    cb({ error: "You are already friends", done: false });
    return;
  }

  // add the friend to the list
  await redisClient.lpush(
    `friends:${socket.user.username}`,
    [username, friendUser.userId].join(".")
  );

  cb({ error: "", done: true });
};

export const disconnectUser = async (socket: any) => {
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

  console.log(friendRooms);

  // emitting the event to all the friends of the user that have disconnect
  // the event will be connected and that will be false.. ..

  socket.to(friendRooms).emit("connected", false, socket.user.username);
};

// Will directly send this to the client
export const parseFriendList = async (friendList: any) => {
  const newFriendList: any = [];

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

  console.log(newFriendList);
  return newFriendList;
};
