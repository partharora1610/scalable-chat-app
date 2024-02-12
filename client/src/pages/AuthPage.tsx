import { LoginForm } from "@/components/shared/forms/LoginForm";
import { useSearchParams } from "react-router-dom";

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode");

  return (
    <div className="max-w-[400px] m-auto border-2 border-black p-4 rounded-md">
      {/* {mode == "login" ? <LoginForm /> : <SignupForm />} */}
      <LoginForm />
    </div>
  );
};

export default AuthPage;
