import { useContext } from "react";
import { Input } from "../ui/input";
import AddFriend from "../modal/AddFriend";
import { FriendContext } from "@/context/FriendContext";

const Sidebar = () => {
  const { friends, selectedFriend, setSelectedFriend } =
    useContext(FriendContext);

  return (
    <div className="col-span-1 px-6 py-8 border-r-2 border-slate-200">
      <div className="mb-8">
        {/* <Input placeholder="Search" className="bg-indigo-100 rounded-lg py-6" /> */}
      </div>
      <div className="mb-8 p-2 w-full">
        <AddFriend />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-xl mb-2 capitalize text-slate-700">
          My friends
        </h3>

        {friends.length === 0 && (
          <div className="text-center text-gray-500">No friends found</div>
        )}
        {friends &&
          friends.map((f: any, index: number) => (
            <div
              onClick={() => {
                setSelectedFriend(f);
              }}
              key={index}
              className={`cursor-pointer flex items-start gap-4 hover:bg-slate-100 p-4 rounded-md  ${
                selectedFriend?.userId == f?.userId ? "bg-slate-100" : ""
              }`}
            >
              <div className="w-16 h-16 bg-indigo-300 rounded-lg"></div>
              <div>
                <h4 className="font-semibold mb-2">
                  {f.username.toUpperCase()}
                </h4>
                <p className="text-sm text-gray-500">
                  <div className="flex gap-2 items-center">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        f.connected ? "bg-green-800" : "bg-red-800"
                      }`}
                    ></div>
                    <p>{f.connected ? "Online" : "Offline"}</p>
                  </div>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
