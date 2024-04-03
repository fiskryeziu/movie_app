import { Switch } from "@/components/ui/switch";
import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { setTheme, theme } = useTheme();
  const { showComments, setShowComments } = useAuth();

  const toggleComments = () => {
    localStorage.setItem("comments", JSON.stringify(!showComments));
    setShowComments(!showComments);
  };

  console.log(showComments);
  return (
    <div className="mt-10 flex w-full flex-col gap-10 sm:w-80">
      <div className="flex w-full justify-between">
        <p>Show Comments</p>
        <Switch checked={showComments} onClick={() => toggleComments()} />
      </div>
      <div className="flex w-full justify-between">
        <p>Change Theme</p>
        <Switch
          checked={theme === "dark"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </div>
    </div>
  );
};

export default Settings;
