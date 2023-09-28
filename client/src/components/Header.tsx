import { Moon, Sun } from "lucide-react"
import { User2 } from "lucide-react"
import React from "react"
import { Sidebar } from "./Sidebar"
import { useTheme } from "./ThemeProvider"
import { Input } from "./ui/input"
import SearchPopOver from "./SearchPopOver"

const Header = () => {
  const { setTheme, theme } = useTheme()
  return (
    <div className="flex max-w-screen-2xl justify-between m-auto h-16 p-4 items-center">
      <div className="flex items-end space-x-4">
        <Sidebar />
        <p className="text-primary text-3xl">Movie.</p>
      </div>
      <div className="">
        <Input
          placeholder="Search"
          className="placeholder:text-base hidden md:flex"
        />
        <SearchPopOver />
      </div>
      <div className="flex space-x-3">
        {theme === "dark" ? (
          <Moon onClick={() => setTheme("light")} />
        ) : (
          <Sun onClick={() => setTheme("dark")} />
        )}
        <User2 />
      </div>
    </div>
  )
}

export default Header
