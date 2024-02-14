import { createContext, useState } from "react";

interface FriendContextInterface {
  friends: any;
  setFriends: (friend: any) => void;
  selectedFriend: any;
  setSelectedFriend: any;
}

export const FriendContext = createContext<FriendContextInterface>({
  friends: [],
  setFriends: (friend: any) => {},
  selectedFriend: {},
  setSelectedFriend: () => {},
});

const FriendContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState();

  return (
    <FriendContext.Provider
      value={{
        selectedFriend,
        setSelectedFriend,
        friends,
        setFriends,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};

export default FriendContextProvider;
