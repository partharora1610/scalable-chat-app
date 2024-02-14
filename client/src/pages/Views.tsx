import PrivateRoute from "@/components/shared/PrivateRoute";

import { AccountContext } from "@/context/AccountContext";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./ChatPage";
import AuthPage from "./AuthPage";

const Views = () => {
  const { user } = useContext(AccountContext);

  return user.loggedIn === null ? (
    <div>Loading...</div>
  ) : (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/chat" element={<ChatPage />} />
      </Route>
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};

export default Views;
