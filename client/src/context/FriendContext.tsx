import { createContext, useState } from "react";

interface FriendContextInterface {
  friends: any;
  setFriends: (friend: any) => void;
}

export const FriendContext = createContext<FriendContextInterface>({
  friends: [],
  setFriends: (friend: any) => {},
});

const FriendContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [friends, setFriends] = useState([
    {
      username: "John",
      connected: true,
    },
    {
      username: "Parth",
      connected: false,
    },
    {
      username: "Binod",
      connectde: true,
    },
  ]);

  return (
    <FriendContext.Provider
      value={{
        friends,
        setFriends,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};

export default FriendContextProvider;
