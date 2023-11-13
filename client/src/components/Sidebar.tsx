import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="text-primary text-2xl">Movies</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col mt-10">
          <SheetClose asChild>
            <Link to={"/"} className="text-xl capitalize">
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link to={"/most-popular"} className="text-xl capitalize">
              Most Popular
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link to={"/most-rated"} className="text-xl capitalize">
              Most rated
            </Link>
          </SheetClose>
        </div>
        <div className="h-3/4 flex justify-center items-end w-full ">
          <div className="grid grid-cols-4 gap-2">
            <SheetClose asChild>
              <Link to={"/genre/action"} className="text-blue-500">
                action
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to={"/genre/comedy"} className="text-red-500">
                comedy
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to={"/genre/drama"} className="text-purple-500">
                drama
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to={"/genre/sci-fi"} className="text-green-500">
                sci-fi
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to={"/genre/romance"} className="text-pink-500">
                romance
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to={"/genre/horror"} className="text-yellow-500">
                horror
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to={"/genre/thriller"} className="text-indigo-500">
                thriller
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to={"/genre/documentary"} className="text-orange-500">
                documentary
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to={"/genre/fantasy"} className="text-teal-500">
                fantasy
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to={"/genre/anime"} className="text-gray-500">
                anime
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
