interface Message {
  to: string;
  from: string;
  message: string;
  timestamp: number;
}

interface ConvertedMessage {
  date: string;
  messages: Message[];
}
