import { Link } from "react-router-dom"
import { Moon, Sun } from "lucide-react"
import { Sidebar } from "./Sidebar"
import { useTheme } from "../context/ThemeProvider"
import { Input } from "./ui/input"
import SearchPopOver from "./SearchPopOver"
import ProfileMenu from "./ProfileMenu"

const Header = () => {
  const { setTheme, theme } = useTheme()
  return (
    <div className="flex max-w-screen-2xl justify-between m-auto h-16 p-4 items-center">
      <div className="flex items-center space-x-4">
        <Sidebar />
        <Link to={"/"} className="text-primary text-3xl">
          Movie.
        </Link>
      </div>
      <div className="">
        <Input
          placeholder="Search"
          className="placeholder:text-base hidden md:flex"
        />
        <SearchPopOver />
      </div>
      <div className="flex space-x-3 items-center">
        {theme === "dark" ? (
          <Moon onClick={() => setTheme("light")} />
        ) : (
          <Sun onClick={() => setTheme("dark")} />
        )}
        <ProfileMenu />
      </div>
    </div>
  )
}

export default Header
