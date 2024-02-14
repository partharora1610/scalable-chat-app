export const timestampTo24HourClock = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const convertMessagesToObjects = (
  messages: Message[]
): ConvertedMessage[] => {
  const convertedMessages: ConvertedMessage[] = [];

  messages.forEach((message) => {
    const date = new Date(message.timestamp * 1000);
    const dateString = date.toDateString();

    const convertedMessageIndex = convertedMessages.findIndex(
      (cm) => cm.date === dateString
    );

    if (convertedMessageIndex !== -1) {
      convertedMessages[convertedMessageIndex].messages.push(message);
    } else {
      const newConvertedMessage: ConvertedMessage = {
        date: dateString,
        messages: [message],
      };
      convertedMessages.push(newConvertedMessage);
    }
  });

  return convertedMessages;
};

export const sortMessagesByTimestamp = (messages: any[]): Message[] => {
  return messages.sort((a, b) => a.timestamp - b.timestamp);
};
