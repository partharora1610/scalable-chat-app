import { FriendContext } from "@/context/FriendContext";
import socket from "@/socket";
import { Globe } from "lucide-react";
import { useContext } from "react";

const GlobalChat = () => {
  const { global, setGlobal, setSelectedFriend } = useContext(FriendContext);

  const joinGloablRoom = () => {
    socket.emit("join_global_room", {
      data: "Joining global room",
    });
    setGlobal(true);
    setSelectedFriend(null);
  };

  const leaveGlobalRoom = () => {
    socket.emit("leave_global_room", {
      data: "Leaving global room",
    });
    console.log("Leaving global room");
    setGlobal(false);
  };

  return (
    <div onClick={joinGloablRoom}>
      <div
        className={`cursor-pointer flex items-start gap-4 hover:bg-slate-100 p-4 rounded-md mb-6 ${
          global ? "bg-slate-100" : ""
        }`}
      >
        <div className="w-16 h-16 bg-indigo-300 rounded-lg flex items-center justify-center">
          <Globe width={40} height={40} className="opacity-15" />
        </div>
        <div>
          <h4 className="font-semibold mb-2">Global Chat</h4>
          <p className="text-sm text-gray-500">
            <div className="flex gap-2 items-center">
              <div className={`h-2 w-2 rounded-full `}></div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
