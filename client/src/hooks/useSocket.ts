import { AccountContext } from "@/context/AccountContext";
import socket from "@/socket";
import { useContext, useEffect } from "react";

export const useSocket = () => {
  const { setFriends } = useContext(AccountContext);

  useEffect(() => {
    socket.connect();

    socket.on("friends_list", (data) => {
      console.log(data);
      console.log("friends list");
      setFriends((prev: any) => [
        ...prev,
        { username: data.username, userId: data.userId, connected: true },
      ]);
    });

    socket.on("connect_error", (error) => {
      console.log(error.message);
    });

    return () => {
      socket.off("connect_error");
    };
  }, []);
};
