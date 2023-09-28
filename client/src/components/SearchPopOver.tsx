import React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Search } from "lucide-react"
import { Input } from "./ui/input"

const SearchPopOver = () => {
  return (
    <Popover>
      <PopoverTrigger className="md:hidden">
        <Search />
      </PopoverTrigger>
      <PopoverContent>
        <Input placeholder="Search" className="placeholder:text-base" />
      </PopoverContent>
    </Popover>
  )
}

export default SearchPopOver
