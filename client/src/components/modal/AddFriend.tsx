import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import socket from "@/socket";
import { useSocket } from "@/hooks/useSocket";
import { useContext } from "react";
import { FriendContext } from "@/context/FriendContext";

const AddFriend = () => {
  // useSocket();

  return (
    <Dialog>
      <DialogTrigger className="bg-indigo-500 text-white px-4 rounded-md">
        ADD
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your friends on the platform</DialogTitle>
          <DialogDescription>
            <ComponentForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriend;

const formSchema = z.object({
  username: z.string(),
});

const ComponentForm = () => {
  const { setFriends } = useContext(FriendContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    socket.emit(
      "add_friend",
      {
        username: values.username,
      },
      ({ error, done, data }: any) => {
        if (!done) {
          form.setError("username", {
            message: error,
          });
          return;
        }

        if (done) {
          setFriends((prev: any) => [
            {
              username: data.username,
              userId: data.userId,
              connected: true,
            },
            ...prev,
          ]);
        }

        form.reset();
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your friends username</FormLabel>
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
  );
};
