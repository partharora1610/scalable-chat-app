import { LoginForm } from "@/components/shared/forms/LoginForm";
import { SignupForm } from "@/components/shared/forms/SignupForm";
import { useSearchParams } from "react-router-dom";

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode");

  return (
    <div className="max-w-[400px] m-auto border-2 border-black p-4 rounded-md">
      {mode == "login" ? <LoginForm /> : <SignupForm />}
    </div>
  );
};

export default AuthPage;
