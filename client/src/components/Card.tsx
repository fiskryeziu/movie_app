import React from "react"
import img from "../assets/movie.jpg"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const Card = () => {
  return (
    <div className="w-full h-auto aspect-[4:3]">
      <HoverCard closeDelay={0}>
        <HoverCardTrigger>
          <img src={img} alt="" className="block w-full h-full object-cover" />
        </HoverCardTrigger>
        <HoverCardContent>
          The React Framework – created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export default Card
