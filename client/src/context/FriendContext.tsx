import { createContext, useEffect, useState } from "react";

interface FriendContextInterface {
  friends: any;
  setFriends: (friend: any) => void;
  selectedFriend: any;
  setSelectedFriend: any;
  global: boolean;
  setGlobal: any;
  setGlobalMessages: any;
  globalMessages: any;
}

export const FriendContext = createContext<FriendContextInterface>({
  friends: [],
  setFriends: (friend: any) => {},
  selectedFriend: {},
  setSelectedFriend: () => {},
  global: false,
  setGlobal: () => {},
  setGlobalMessages: () => {},
  globalMessages: [],
});

const FriendContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState();
  const [global, setGlobal] = useState(false);
  const [globalMessages, setGlobalMessages] = useState([]);

  useEffect(() => {
    setSelectedFriend(friends[0]);
  }, [friends]);

  return (
    <FriendContext.Provider
      value={{
        selectedFriend,
        setSelectedFriend,
        friends,
        setFriends,
        global,
        setGlobal,
        setGlobalMessages,
        globalMessages,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};

export default FriendContextProvider;
