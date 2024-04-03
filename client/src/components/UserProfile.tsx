import { User } from "lucide-react"
import { Input } from "./ui/input"
import { useAuth } from "@/hooks/useAuth"
import { SubmitHandler, useForm } from "react-hook-form"
import { trpc } from "@/trpc"

type FormValues = {
  name: string
}
const UserProfile = () => {
  const { register, handleSubmit } = useForm<FormValues>()
  const { userData } = useAuth()

  // const utils = trpc.useContext()
  const { mutate } = trpc.user.changeUsername.useMutation({
    onSuccess(result) {
      localStorage.setItem("userInfo", JSON.stringify(result))
      // utils.invalidate()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate({
      username: data.name,
    })
  }

  return (
    <div className="flex flex-col mt-10 w-full  sm:w-80 items-center gap-10">
      <div className="flex">
        <User /> <p className="text-xl">Edit Profile</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full px-2 gap-4"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-thin text-xs text-destructive uppercase tracking-widest"
          >
            Email address
          </label>
          <Input
            name="email"
            className="outline outline-1"
            value={userData?.email}
            placeholder="Enter email"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="font-thin text-xs text-destructive uppercase tracking-widest"
          >
            Your name
          </label>
          <Input
            {...register("name")}
            defaultValue={userData?.username}
            className="outline outline-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="font-thin text-xs text-destructive uppercase tracking-widest"
          >
            Joined
          </label>
          <Input
            name="joined"
            value={userData?.createdAt.toLocaleDateString("en-DE")}
            className="outline outline-1"
            disabled
          />
        </div>

        <button className="bg-primary py-2 rounded-sm brightness-50 hover:brightness-100">
          Save
        </button>
      </form>
    </div>
  )
}

export default UserProfile
