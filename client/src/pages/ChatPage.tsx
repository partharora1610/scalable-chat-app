import AddFriend from "@/components/modal/AddFriend";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FRIENDS = [
  {
    name: "Parth Arora",
    messages: [
      {
        sender: "Friend 1",
        message: "Hello",
        time: "12:00",
      },
      {
        sender: "You",
        message: "Hi",
        time: "12:01",
      },
      {
        sender: "Friend 1",
        message: "How are you?",
        time: "12:02",
      },
      {
        sender: "You",
        message: "I'm good, you?",
        time: "12:03",
      },
      {
        sender: "Friend 1",
        message: "I'm good too",
        time: "12:04",
      },
    ],
  },
  {
    name: "Friend 2",
    messages: [
      {
        sender: "Friend 2",
        message: "Hello",
        time: "12:00",
      },
      {
        sender: "You",
        message: "Hi",
        time: "12:01",
      },
      {
        sender: "Friend 2",
        message: "How are you?",
        time: "12:02",
      },
      {
        sender: "You",
        message: "I'm good, you?",
        time: "12:03",
      },
      {
        sender: "Friend 2",
        message: "I'm good too",
        time: "12:04",
      },
    ],
  },
];
const ChatPage = () => {
  const [selectedFriend, setSelectedFriend] = useState(FRIENDS[0]);

  const handleFriendSelect = (friend: (typeof FRIENDS)[0]) => {
    setSelectedFriend(friend);
  };

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("clicked");
  };

  return (
    <div className="bg-white h-[100vh]">
      <div className="grid grid-cols-6 h-full">
        <div className="col-span-1 bg-indigo-50 px-6 py-8">
          <div className="mb-8">
            <Input placeholder="search friends" />
          </div>
          <div className="flex mb-8 justify-between p-2">
            <h3 className="font-bold text-lg mb-6">My friends</h3>
            <AddFriend />
          </div>

          <div className="flex flex-col gap-6">
            {FRIENDS.map((f, index) => (
              <div
                key={index}
                onClick={() => handleFriendSelect(FRIENDS[index])}
                className="flex items-center gap-4 hover:bg-indigo-100 p-2 rounded-md"
              >
                <div className="w-12 h-12 bg-indigo-300 rounded-full"></div>
                <div>
                  <h4 className="font-semibold">{f.name}</h4>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT BOX */}
        <div className="p-4 col-span-5">
          <div className="bg-indigo-50 drop-shadow-sm max-w-[70%] m-auto p-4">
            {selectedFriend.name}
          </div>
          {/*  */}
          <div className=" flex flex-col justify-between">
            <h3 className="font-bold text-lg mb-6">{selectedFriend.name}</h3>
            <div className="flex flex-col gap-4">
              {selectedFriend.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 ${
                    message.sender === "You" ? "justify-end" : ""
                  }`}
                >
                  <div
                    className={`p-4 rounded-md ${
                      message.sender === "You"
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-200"
                    }`}
                  >
                    {message.message}
                  </div>
                  <p className="text-xs text-gray-500">{message.time}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <form action="" onSubmit={formSubmitHandler}>
                <Input placeholder="Type a message" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
