import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext({
  user: { loggedIn: false },
  setUser: (user: any) => {},
  friends: [{ username: "", userId: "", connected: false }],
  setFriends: (friends: any) => {},
});

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ loggedIn: false });
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/login",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "http://localhost:5173",
              "Access-Control-Allow-Credentials": true,
            },
            withCredentials: true,
          }
        );

        console.log(response);

        if (response.status == 200) {
          console.log(response.data);
          setUser({ ...response.data });
          navigate("/chat");
        }
      } catch (error) {
        setUser({ loggedIn: false });
      }
    };

    loadUser();
  }, [setUser]);

  return (
    <AccountContext.Provider value={{ user, setUser, friends, setFriends }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
