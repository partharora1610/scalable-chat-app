import { AccountContext } from "@/context/AccountContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const { user } = useContext(AccountContext);

  return user && user.loggedIn;
};

const PrivateRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
