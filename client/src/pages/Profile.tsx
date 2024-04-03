import clsx from "clsx"
import avengers from "../assets/avengers.jpg"
import { History, Settings, User } from "lucide-react"
import { NavLink, Outlet } from "react-router-dom"

const Profile = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex z-50 justify-center items-end w-full h-72 relative rounded-b-3xl overflow-hidden">
        <img
          src={avengers}
          alt="profile banner"
          className="absolute z-0 top-0 left-0 w-full h-full object-cover object-top blur-xl"
        />
        <div className="flex z-10 gap-10 capitalize">
          <NavLink
            to={"user-profile"}
            className={({ isActive }) =>
              clsx(
                "flex items-center hover:text-primary hover:fill-primary",
                isActive && "text-primary fill-primary"
              )
            }
          >
            <User className="w-6 h-6 md:w-4 md:h-4" />
            <p className="font-semibold cursor-pointer hidden md:block">
              Profile
            </p>
          </NavLink>
          <NavLink
            to={"watch-list"}
            className={({ isActive }) =>
              clsx(
                "flex items-center hover:text-primary hover:fill-primary",
                isActive && "text-primary fill-primary"
              )
            }
          >
            <History className="w-6 h-6 md:w-4 md:h-4" />
            <p className="font-semibold cursor-pointer hidden md:block">
              Watch List
            </p>
          </NavLink>
          <NavLink
            to={"settings"}
            className={({ isActive }) =>
              clsx(
                "flex items-center hover:text-primary hover:fill-primary",
                isActive && "text-primary fill-primary"
              )
            }
          >
            <Settings className="w-6 h-6 md:w-4 md:h-4" />
            <p className="font-semibold cursor-pointer hidden md:block">
              Settings
            </p>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Profile
