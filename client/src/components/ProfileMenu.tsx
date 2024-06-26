import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { User2 } from "lucide-react"

const ProfileMenu = () => {
  const { userData, loginHandler, logoutHandler } = useAuth()

  return (
    <Menubar className="border-0 m-0 p-0">
      <MenubarMenu>
        <MenubarTrigger>
          <User2 className="cursor-pointer" />
        </MenubarTrigger>
        <MenubarContent>
          {userData?.token ? (
            <>
              <MenubarItem asChild className="cursor-pointer">
                <Link to={"/profile"} className="w-full h-full bg-transparent">
                  Profile
                </Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={logoutHandler} className="cursor-pointer">
                Logout
              </MenubarItem>
            </>
          ) : (
            <MenubarItem onClick={loginHandler} className="cursor-pointer">
              Login
            </MenubarItem>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default ProfileMenu
