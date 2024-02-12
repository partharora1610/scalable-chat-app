import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AccountContext = createContext({
  user: { loggedIn: false },
  setUser: (user: any) => {},
});

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({ loggedIn: false });
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const checkLoggedIn = async () => {
  //       const response = await axios.post(
  //         "http://localhost:5000/api/auth/login",
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //             "Access-Control-Allow-Origin": "http://localhost:5173",
  //             "Access-Control-Allow-Credentials": true,
  //           },
  //           withCredentials: true,
  //         }
  //       );

  //       if (!response || !response.status || response.status >= 400) {
  //         setUser({ loggedIn: false });
  //         return;
  //       }

  //       setUser({ ...response.data });
  //       navigate("/home");
  //     };

  //     checkLoggedIn();
  //   });
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
