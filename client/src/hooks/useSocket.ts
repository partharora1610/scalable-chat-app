import socket from "@/socket";
import { useEffect } from "react";

export const useSocket = () => {
  useEffect(() => {
    socket.connect();

    socket.on("connect_error", (error) => {
      console.log(error.message);
    });

    return () => {
      socket.off("connect_error");
    };
  }, []);
};
