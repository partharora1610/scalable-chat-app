import { LoginForm } from "@/components/shared/forms/LoginForm";
import { SignupForm } from "@/components/shared/forms/SignupForm";
import { AccountContext } from "@/context/AccountContext";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";

const AuthPage = () => {
  const { user } = useContext(AccountContext);

  if (user.loggedIn) {
    return <div>You are already logged in</div>;
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode");
  console.log(mode);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default AuthPage;
