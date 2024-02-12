import redisClient from "../redis";

interface addFriendData {
  data: {
    username: string;
  };
  cb: (arg: { error: string; done: boolean }) => void;
  socket: any;
}

export const addFriend = async ({ socket, data, cb }: addFriendData) => {
  console.log(data);
  const { username } = data;
  // ###########################################
  // update the postgress database

  const friendUserId = await redisClient.hget(`userId:${username}`, "userId");

  if (!friendUserId) {
    cb({ error: "User not found", done: false });
    return;
  }

  if (friendUserId === socket.user.userId) {
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
  await redisClient.lpush(`friends:${socket.user.username}`, username);
  console.log(`friends:${socket.user.username}`);
  console.log("added to the friend list");
  cb({ error: "", done: true });
};
