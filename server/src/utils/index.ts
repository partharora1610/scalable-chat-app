import { Messages } from "../types";

export const parseMessages = (messages: string[]): Messages[] => {
  const parsedMessages = messages.map((m: string) => {
    const array = m.split(".");
    return {
      to: array[0],
      from: array[1],
      message: array[2],
      timestamp: array[3],
    };
  });

  return parsedMessages;
};
