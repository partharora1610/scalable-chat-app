import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
  reconnection: false,
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 5000,
  transports: ["websocket"],
});

export default socket;
