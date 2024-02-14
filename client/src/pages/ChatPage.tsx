import Sidebar from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { AccountContext } from "@/context/AccountContext";
import { FriendContext } from "@/context/FriendContext";
import { MessageContext } from "@/context/MessagesContext";
import { useSocket } from "@/hooks/useSocket";
import socket from "@/socket";
import { sortMessagesByTimestamp, timestampTo24HourClock } from "@/utils";
import { useContext, useState } from "react";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const { setMessages, messages } = useContext(MessageContext);

  const { selectedFriend } = useContext(FriendContext);

  const sortedMessgaes = sortMessagesByTimestamp(messages);

  useSocket();

  const formSubmitHandler = (e: any) => {
    e.preventDefault();

    const messageObj = {
      to: selectedFriend.userId,
      from: null,
      message: message,
    };

    setMessages((prev) => [...prev, messageObj]);

    socket.emit("message_dm", {
      data: messageObj,
    });

    setMessage("");
  };

  return (
    <div className="bg-white h-[100vh]">
      <div className="grid grid-cols-6 h-full">
        <Sidebar />

        <div className=" col-span-5 px-8">
          {/* <div className="bg-slate-50 mb-8 m-auto p-4 flex justify-between items-center">
            <div>
              <p className="text-slate-400">online</p>
            </div>

            <div>Actions</div>
          </div> */}

          <div className="h-[100%] p-12  flex flex-col justify-end">
            <div className="flex flex-col gap-4">
              {sortedMessgaes.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-6 ${
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
                      <div>{timestampTo24HourClock(message.timestamp)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <form action="" onSubmit={formSubmitHandler}>
                <div className="flex  gap-2 justify-center items-center">
                  <Input
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
    </div>
  );
};

export default ChatPage;
