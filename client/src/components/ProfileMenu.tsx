import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { User2 } from "lucide-react"
import { Link } from "react-router-dom"

const ProfileMenu = () => {
  const loginHandler = () => {}
  return (
    <Menubar className="border-0 m-0 p-0">
      <MenubarMenu>
        <MenubarTrigger>
          <User2 />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link to={"/profile"} className="w-full h-full bg-transparent">
              Profile
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={loginHandler}>Login</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default ProfileMenu
