import { useAuth } from "@/hooks/useAuth";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

function AdminSideNav({ close }: { close: () => void }) {
  const { logoutHandler } = useAuth();
  return (
    <div className="relative flex  h-full flex-col">
      <X
        className="absolute right-2 top-2 cursor-pointer hover:text-primary"
        onClick={close}
      />
      <Link
        to=""
        className="mt-10 text-center text-2xl font-bold hover:text-primary"
        onClick={close}
      >
        Dashboard
      </Link>
      <ul className="mt-10 flex flex-col gap-5 font-bold">
        <li className="w-full p-3 hover:bg-black/20">
          <Link to="movies" onClick={close}>
            Movies
          </Link>
        </li>
        <li className="w-full p-3 hover:bg-black/20">
          <Link to="add-movie" onClick={close}>
            Add a Movie
          </Link>
        </li>
        <li className="w-full p-3 hover:bg-black/20">
          <Link to="users" onClick={close}>
            Users
          </Link>
        </li>
      </ul>
      <button
        onClick={logoutHandler}
        className="absolute bottom-2  mt-2  w-full rounded-sm bg-primary/60 p-2 font-bold hover:bg-primary md:bottom-0"
      >
        Logout
      </button>
    </div>
  );
}

export default AdminSideNav;
