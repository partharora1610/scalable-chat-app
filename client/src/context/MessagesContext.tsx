import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface Message {
  from: string | null;
  to: string;
  message: string;
}

interface MessageContextInterface {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

export const MessageContext = createContext<MessageContextInterface>({
  messages: [],
  setMessages: () => {},
});

interface MessageContextProviderProps {
  children: ReactNode;
}

const MessageContextProvider = ({ children }: MessageContextProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
