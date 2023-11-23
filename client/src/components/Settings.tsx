import { Switch } from "@/components/ui/switch"
import React from "react"
import { useTheme } from "./ThemeProvider"

const Settings = () => {
  const { setTheme, theme } = useTheme()
  return (
    <div className="flex flex-col mt-10 gap-10 w-full sm:w-80">
      <div className="flex justify-between w-full">
        <p>Show Comments</p>
        <Switch />
      </div>
      <div className="flex justify-between w-full">
        <p>Change Theme</p>
        <Switch
          checked={theme === "dark"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </div>
    </div>
  )
}

export default Settings
