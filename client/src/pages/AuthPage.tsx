import { LoginForm } from "@/components/shared/forms/LoginForm";
import { AccountContext } from "@/context/AccountContext";
import { useContext } from "react";
// import { useSearchParams } from "react-router-dom";

const AuthPage = () => {
  const { user } = useContext(AccountContext);

  if (user.loggedIn) {
    return <div>You are already logged in</div>;
  }

  // const [searchParams, setSearchParams] = useSearchParams();

  // const mode = searchParams.get("mode");

  return (
    <div className="max-w-[400px] m-auto border-2 border-black p-4 rounded-md">
      {/* {mode == "login" ? <LoginForm /> : <SignupForm />} */}
      <LoginForm />
    </div>
  );
};

export default AuthPage;
