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

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URI: string;
      CLIENT_URL: string;
    }
  }
}

export {};
