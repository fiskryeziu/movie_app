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
  const loginHandler = () => {}
  return (
    <Menubar className="border-0 m-0 p-0">
      <MenubarMenu>
        <MenubarTrigger className="">
          <User2 />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Profile</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={loginHandler}>Login</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default ProfileMenu
