import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  loggedIn: boolean;
  username?: string;
  userId?: string;
}

interface AccountContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AccountContext = createContext<AccountContextType>({
  user: { loggedIn: false },
  setUser: () => {},
});

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ loggedIn: false });

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
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
