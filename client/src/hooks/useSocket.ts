import socket from "@/socket";
import { useEffect } from "react";

export const useSocket = () => {
  useEffect(() => {
    // Connect to the socket server
    socket.connect();

    socket.on("friends_list", (data) => {
      console.log(data);
    });

    socket.on("connect_error", (error) => {
      console.log(error.message);
    });

    return () => {
      socket.off("connect_error");
    };
  }, []);
};
