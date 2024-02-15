import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext({
  user: { loggedIn: false },
  setUser: (user: any) => {},
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
