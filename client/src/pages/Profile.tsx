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
              [
                "flex items-center hover:text-primary hover:fill-primary",
                isActive && "text-primary fill-primary",
              ].join(" ")
            }
          >
            <User size={16} />
            <p className="font-semibold cursor-pointer">Profile</p>
          </NavLink>
          <NavLink
            to={"watch-list"}
            className={({ isActive }) =>
              [
                "flex items-center hover:text-primary hover:fill-primary",
                isActive && "text-primary fill-primary",
              ].join(" ")
            }
          >
            <History className="" size={16} />
            <p className="font-semibold cursor-pointer">Watch List</p>
          </NavLink>
          <NavLink
            to={"settings"}
            className={({ isActive }) =>
              [
                "flex items-center hover:text-primary hover:fill-primary",
                isActive && "text-primary fill-primary",
              ].join(" ")
            }
          >
            <Settings size={16} />
            <p className="font-semibold cursor-pointer">Settings</p>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Profile
