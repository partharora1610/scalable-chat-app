import { LoginForm } from "@/components/shared/forms/LoginForm";
import { AccountContext } from "@/context/AccountContext";
import { useContext } from "react";

const AuthPage = () => {
  const { user } = useContext(AccountContext);

  if (user.loggedIn) {
    return <div>You are already logged in</div>;
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default AuthPage;
