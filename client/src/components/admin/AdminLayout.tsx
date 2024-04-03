import clsx from "clsx";
import { useState } from "react";
import AdminSideNav from "./AdminSideNav";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

export const AdminLayout = () => {
  const [show, setShow] = useState(false);

  const toggleHandler = () => {
    setShow(!show);
  };
  // FIXME: fix the heigh of sidebar
  return (
    <div className="min-h-screen bg-secondary/50 pb-20 md:pb-0">
      <div className="relative flex  md:overflow-hidden">
        <div
          className={clsx(
            "fixed z-10 m-2 h-screen flex-none  rounded-lg bg-secondary duration-200 ease-in md:h-[calc(100vh-1em)]",
            !show && "w-0 -translate-x-96",
            show &&
              "w-64 translate-x-0 transition-all duration-200 ease-in  md:relative",
          )}
        >
          <AdminSideNav close={toggleHandler} />
        </div>
        <Menu
          className={clsx(
            "absolute z-10 m-6 cursor-pointer hover:text-primary",
            show ? "hidden" : "block",
          )}
          onClick={() => setShow(!show)}
        />
        <div className="flex-grow md:overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
