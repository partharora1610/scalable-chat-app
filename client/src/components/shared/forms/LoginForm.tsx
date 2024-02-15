import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "@/context/AccountContext";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const LoginForm = () => {
  const { setUser } = useContext(AccountContext);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
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

      if (response.status === 200) {
        setUser({ ...response.data });
        navigate("/chat");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full lg:w-1/2 flex justify-center items-center lg:items-start px-6 py-8 lg:px-16 lg:py-0">
        <div className="flex flex-col gap-12">
          <div className="text-2xl">SAMPLE USERS</div>
          <div>
            <div>email: partharora@gmail.com</div>
            <p>password: partharora </p>
          </div>

          <div>
            <div>email: hello@gmail.com</div>
            <p>password: helloworld </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-6 py-8 lg:px-16 lg:py-0">
        <div className="space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold">Login in to your account</h1>
            <p className="text-gray-500 dark:text-gray-400">Or</p>
          </div>
          <div className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8p-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
