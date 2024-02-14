declare module "socket.io" {
  interface Socket {
    user: {
      username: string;
      userId: string;
    };
  }
}

declare module "http" {
  interface IncomingMessage {
    session: {
      user: {
        username: string;
        userId: string;
      };
    };
  }
}

export {};
