import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

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

        <ul className="flex flex-col mt-10">
          <li className="text-xl capitalize">home</li>
          <li className="text-xl capitalize">home</li>
          <li className="text-xl capitalize">home</li>
          <li className="text-xl capitalize">home</li>
          <li className="text-xl capitalize">home</li>
        </ul>
      </SheetContent>
    </Sheet>
  )
}
