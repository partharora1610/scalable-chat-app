import { FriendContext } from "@/context/FriendContext";
import socket from "@/socket";
import { Globe } from "lucide-react";
import { useContext } from "react";
import { useToast } from "./ui/use-toast";

const GlobalChat = () => {
  const { toast } = useToast();

  const { global, setGlobal, setSelectedFriend } = useContext(FriendContext);

  const joinGloablRoom = () => {
    socket.emit("join_global_room", {
      data: "Joining global room",
    });
    setGlobal(true);
    setSelectedFriend(null);
    toast({
      title: "Joined global room",
      description: "You have joined the global room",
      variant: "default",
    });
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
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
