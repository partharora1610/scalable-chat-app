export const timestampTo24HourClock = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const convertMessagesToObjects = (messages: any[]): any[] => {
  const convertedMessages: any[] = [];

  messages.forEach((message) => {
    const date = new Date(message.timestamp * 1000);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "long",
    };
    const dateString = date.toLocaleDateString("en-US", options);

    const convertedMessageIndex = convertedMessages.findIndex(
      (cm) => cm.date === dateString
    );

    if (convertedMessageIndex !== -1) {
      convertedMessages[convertedMessageIndex].messages.push(message);
    } else {
      const newConvertedMessage: any = {
        date: dateString,
        messages: [message],
      };
      convertedMessages.push(newConvertedMessage);
    }
  });

  convertedMessages.forEach((cm) => {
    cm.messages.sort((a: any, b: any) => a.timestamp - b.timestamp);
  });

  console.log(convertedMessages);

  return convertedMessages;
};

export const sortMessagesByTimestamp = (messages: any[]): any[] => {
  return messages.sort((a, b) => a.timestamp - b.timestamp);
};
