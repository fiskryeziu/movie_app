import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "@/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useAuth } from "@/hooks/useAuth";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(4),
});

const LoginPage = () => {
  const { userData, setUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.token) {
      navigate("/");
    }
  }, [navigate, userData]);

  const { mutate } = trpc.user.login.useMutation({
    onSuccess: (result) => {
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      const userData = result.data;
      setUserData({
        id: userData.id,
        email: userData.email,
        username: userData.username,
        role: userData.role,
        createdAt: new Date(userData.createdAt),
        token: userData.token,
      });
      navigate("/");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values: z.infer<typeof formSchema>) => {
    mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="my-10  flex flex-col items-center justify-center">
      <p className="text-3xl font-bold tracking-wide text-primary">Login</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="w-full max-w-xs space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email..." {...field} />
                </FormControl>
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
                  <Input
                    placeholder="Enter password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Don't have an account?
                  <Link
                    to={"/register"}
                    className="pl-2 text-primary underline dark:text-white"
                  >
                    Register
                  </Link>
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
