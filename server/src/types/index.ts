import { Socket } from "socket.io";

export interface addFriendData {
  data: {
    username: string;
  };
  cb: (arg: {
    error: string;
    done: boolean;
    data?: {
      username: string;
      userId: string;
    };
  }) => void;
  socket: Socket;
}

export interface FriendList {
  username: string;
  userId: string;
  connected: boolean;
}

export interface Messages {
  from: string;
  to: string;
  message: string;
  timestamp: string;
}
