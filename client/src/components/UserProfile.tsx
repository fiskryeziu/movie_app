import { User } from "lucide-react"
import { Input } from "./ui/input"

const UserProfile = () => {
  return (
    <div className="flex flex-col mt-10 w-full  sm:w-80 items-center gap-10">
      <div className="flex">
        <User /> <p className="text-xl">Edit Profile</p>
      </div>
      <form className="flex flex-col w-full px-2 gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-thin text-xs text-destructive uppercase tracking-widest"
          >
            Email address
          </label>
          <Input
            className="outline outline-1"
            value="john@gmail.com"
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
          <Input name="name" value="fis" className="outline outline-1" />
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
            value="2022-05-02"
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
