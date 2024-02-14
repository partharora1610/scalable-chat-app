"use client";

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
import { AccountContext } from "@/context/AccountContext";
import { useContext } from "react";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  username: z.string(),
  name: z.string(),
  confirmPassword: z.string(),
});

export const SignupForm = () => {
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email: values.email,
          password: values.password,
          username: values.username,
          name: values.name,
          confirmPassword: values.confirmPassword,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setUser({ ...response.data });
        navigate("/chat");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
