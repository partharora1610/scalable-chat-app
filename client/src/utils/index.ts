export const timestampTo24HourClock = (timestamp: string): string => {
  const date = new Date(Number(timestamp));
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export function restructureMessagesByDate(messages: any[]): any[] {
  const messagesByDateMap: { [date: string]: any[] } = {};

  messages.sort((a, b) => a.timestamp - b.timestamp);

  messages.forEach((message) => {
    const dateKey = new Date(Number(message.timestamp)).toDateString();

    if (!messagesByDateMap[dateKey]) {
      messagesByDateMap[dateKey] = [];
    }
    messagesByDateMap[dateKey].push(message);
  });

  const messagesByDateArray: any[] = [];
  for (const date in messagesByDateMap) {
    messagesByDateArray.push({ date, messages: messagesByDateMap[date] });
  }

  return messagesByDateArray;
}
