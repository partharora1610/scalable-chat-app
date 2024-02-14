import Sidebar from "@/components/shared/Sidebar";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/hooks/useSocket";

const ChatPage = () => {
  useSocket();

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white h-[100vh]">
      <div className="grid grid-cols-6 h-full">
        <Sidebar />

        {/* CHAT BOX */}
        <div className="col-span-5 px-8">
          <div className="bg-slate-50 mb-8 m-auto p-4 flex justify-between items-center">
            <div>
              {/* <h3 className="text-2xl font-medium">{selectedFriend.name}</h3> */}
              <p className="text-slate-400">online</p>
            </div>

            <div>Actions</div>
          </div>

          <div className=" flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              {/* {selectedFriend.messages.map((message, index) => (
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
              ))} */}
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
