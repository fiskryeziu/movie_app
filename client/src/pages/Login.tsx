import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { trpc } from "@/trpc"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

const LoginPage = () => {
  const { setIsAuthed, setUserData } = useAuth()
  const navigate = useNavigate()

  const { mutate } = trpc.user.login.useMutation({
    onSuccess: (result) => {
      localStorage.setItem("userInfo", JSON.stringify(result.data))
      setIsAuthed(true)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { token, ...userData } = result.data
      setUserData({
        id: userData.id,
        email: userData.email,
        username: userData.username,
        role: userData.role,
      })
      navigate("/")
    },
    onError: (error) => {
      console.log(error.message)
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLogin = (values: z.infer<typeof formSchema>) => {
    mutate({
      email: values.email,
      password: values.password,
    })
  }

  return (
    <div className="flex  flex-col justify-center items-center my-10">
      <p className="text-3xl text-primary font-bold tracking-wide">Login</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="space-y-8 max-w-xs w-full"
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
                    className="pl-2 underline text-primary dark:text-white"
                  >
                    Sign up
                  </Link>
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginPage
