import { AccountContext } from "@/context/AccountContext";
import { FriendContext } from "@/context/FriendContext";
import socket from "@/socket";
import { useContext, useEffect } from "react";

export const useSocket = () => {
  const { setFriends, friends } = useContext(FriendContext);
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    socket.connect();

    socket.on("friends_list", (data) => {
      // console.log("friends_list_old", data);
      // setFriends((prev: any) => [
      //   ...prev,
      //   { username: data.username, userId: data.userId, connected: true },
      // ]);
      // console.log("friends_list_new", friends);
      console.log("friends_list", data);
      setFriends(data);
    });

    socket.on("connected", (status, username) => {
      setFriends((prev: any) =>
        prev.map((f: any) =>
          f.username === username ? { ...f, connected: status } : f
        )
      );
    });

    socket.on("connect_error", () => {
      setUser({
        loggedIn: false,
      });
    });

    return () => {
      socket.off("connect_error");
    };
  }, [setUser]);
};
