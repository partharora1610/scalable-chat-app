import { AccountContext } from "@/context/AccountContext";
import { FriendContext } from "@/context/FriendContext";
import { MessageContext } from "@/context/MessagesContext";
import socket from "@/socket";
import { useContext, useEffect } from "react";

export const useSocket = () => {
  const { setFriends, setGlobalMessages } = useContext(FriendContext);
  const { setUser } = useContext(AccountContext);
  const { setMessages } = useContext(MessageContext);

  useEffect(() => {
    socket.connect();

    socket.on("friends_list", (data) => {
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

    socket.on("dm_server", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("messages_list", (messages: any) => {
      setMessages(messages);
    });

    socket.on("message_global_list", (message: any) => {
      console.log("from message_global_list");
      console.log(message);
      setGlobalMessages(message);
    });

    socket.on("message_global", (message: any) => {
      setGlobalMessages((prev: any) => [...prev, message]);
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("messages");
      socket.off("friends_list");
      socket.off("dm_server");
      socket.off("message_global");
    };
  }, [setUser]);
};
