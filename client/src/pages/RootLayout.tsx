import UserContext from "@/context/AccountContext";
import { useSocket } from "@/hooks/useSocket";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  useSocket();

  return (
    <div>
      <UserContext>
        <Outlet />
      </UserContext>
    </div>
  );
};

export default RootLayout;
