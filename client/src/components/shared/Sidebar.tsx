import { useContext } from "react";
import { Input } from "../ui/input";
import AddFriend from "../modal/AddFriend";
import { FriendContext } from "@/context/FriendContext";

const Sidebar = () => {
  const { friends } = useContext(FriendContext);

  console.log(friends);

  return (
    <div className="col-span-1  px-6 py-8">
      <div className="mb-8">
        <Input placeholder="Search" className="bg-indigo-100 rounded-lg py-6" />
      </div>
      <div className="flex mb-8 justify-between p-2">
        <h3 className="font-bold text-lg mb-6">My friends</h3>
        <AddFriend />
      </div>

      <div className="flex flex-col gap-4">
        {friends &&
          friends.map((f: any, index: number) => (
            <div
              key={index}
              className="cursor-pointer flex items-center gap-4 hover:bg-slate-100 p-2 rounded-md"
            >
              <div className="w-12 h-12 bg-indigo-300 rounded-lg"></div>
              <div>
                <h4 className="font-semibold">{f.username}</h4>
                <p className="text-sm text-gray-500">
                  {f.connected ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
