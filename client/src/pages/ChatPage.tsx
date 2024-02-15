import Sidebar from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FriendContext } from "@/context/FriendContext";
import { MessageContext } from "@/context/MessagesContext";
import { useSocket } from "@/hooks/useSocket";
import socket from "@/socket";
import { restructureMessagesByDate, timestampTo24HourClock } from "@/utils";
import { useContext, useEffect, useRef, useState } from "react";

const ChatPage = () => {
  useSocket();
  const [message, setMessage] = useState("");
  const { setMessages, messages } = useContext(MessageContext);
  const { selectedFriend, global, globalMessages, setGlobalMessages } =
    useContext(FriendContext);
  const bottomDiv = useRef<HTMLDivElement>(null);

  let thisRoomMessages;

  if (global) {
    thisRoomMessages = globalMessages.filter((message: any) => {
      return message.to == "global" || message.from == "global";
    });
  } else {
    thisRoomMessages = messages.filter((message) => {
      return (
        message.to === selectedFriend?.userId ||
        message.from === selectedFriend?.userId
      );
    });
  }

  const convertedMessages = restructureMessagesByDate(thisRoomMessages);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (global) {
      console.log("here");
      socket.emit("message_global", {
        data: {
          message: message,
          from: null,
        },
      });

      setGlobalMessages((prev: any) => [
        ...prev,
        {
          to: "global",
          from: null,
          message: message,
          timestamp: Date.now(),
        },
      ]);

      setMessage("");
      return;
    }

    const messageObj = {
      to: selectedFriend.userId,
      from: null,
      message: message,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, messageObj]);

    socket.emit("message_dm", {
      data: messageObj,
    });

    setMessage("");
  };

  useEffect(() => {
    if (bottomDiv.current) {
      console.log("bottomDiv.current");
      bottomDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="bg-white h-screen flex overflow-hidden">
      <div className="w-[20vw] h-full">
        <Sidebar />
      </div>

      <div className="w-full">
        <div className="h-[100%] p-12  flex flex-col justify-end">
          {!global && (
            <div className="bg-slate-100 mb-8 m-auto rounded-full py-8 px-12 flex justify-between items-center w-full">
              <div className="flex gap-2 items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full ${
                    selectedFriend?.connected ? "bg-green-800" : "bg-red-800"
                  }`}
                ></div>
                <div className="font-semibold text-xl">
                  {selectedFriend?.username.toUpperCase()}
                </div>
              </div>
            </div>
          )}

          {global && (
            <div className="bg-slate-100 mb-8 m-auto rounded-full py-8 px-12 flex justify-between items-center w-full">
              <div className="flex gap-2 items-center justify-center">
                <div className="font-semibold text-xl">Global Chat</div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 h-full overflow-hidden overflow-y-auto hs">
            {convertedMessages.map((converted) => {
              return (
                <>
                  <div className="mb-8">
                    <div className="text-center mb-6">{converted.date}</div>
                    <div className="">
                      {converted.messages.map((message: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-6 mb-3 ${
                              message.from != selectedFriend?.userId
                                ? "justify-end"
                                : ""
                            }`}
                          >
                            <div className="flex flex-col gap-2 text-slate-600 items-end ">
                              <div
                                className={`p-4 rounded-md ${
                                  message.from != selectedFriend?.userId
                                    ? "bg-indigo-500 text-white"
                                    : "bg-slate-200"
                                }`}
                              >
                                {message.message}
                              </div>
                              <div>
                                {timestampTo24HourClock(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={bottomDiv} />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="mt-4 sticky bottom-0">
            <form action="" onSubmit={formSubmitHandler}>
              <div className="flex  gap-2 justify-center items-center pt-6 border-t-2 border-slate-200 ">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message"
                  className="p-4 py-8"
                />
                <Button>Send</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
