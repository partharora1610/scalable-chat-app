import { AccountContext } from "@/context/AccountContext";
import { FriendContext } from "@/context/FriendContext";
import { MessageContext } from "@/context/MessagesContext";
import socket from "@/socket";
import { useContext, useEffect } from "react";

export const useSocket = () => {
  const { setFriends } = useContext(FriendContext);
  const { setUser } = useContext(AccountContext);
  const { setMessages } = useContext(MessageContext);

  useEffect(() => {
    socket.connect();

    socket.on("friends_list", (data) => {
      console.log("friends_list", data);
      setFriends(data);
    });

    // socket.on("messages", (data: any) => {
    //   console.log("messages", data);
    //   setMessages(data);
    // });

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

    socket.on("dm_server", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("messages_list", (messages: any) => {
      console.log("messages_list");
      console.log(messages);
      setMessages(messages);
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("messages");
      socket.off("friends_list");
      socket.off("dm.");
    };
  }, [setUser]);
};
