import img from "../assets/movie.jpg"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Star } from "lucide-react"

const Card = () => {
  return (
    <div className="w-full h-auto aspect-[4:3] hover:-translate-y-1 hover:duration-200 duration-75">
      <HoverCard closeDelay={0}>
        <HoverCardTrigger href="/movie/1">
          <img src={img} alt="" className="block w-full h-full object-cover" />
        </HoverCardTrigger>
        <HoverCardContent>
          <div>
            <div className="mb-2">
              <p className="text-xl line-clamp-2 font-bold">
                Doctor Strange in the Multiverse of Madness
              </p>
              <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-2">
                  <Star color="yellow" size={16} fill="yellow" /> <p>8.4</p>
                </div>
                <p>2h 6m</p>
              </div>
              <p className="line-clamp-3">
                Doctor Strange teams up with a mysterious teenage girl from his
                dreams who can travel across multiverses, to battle multiple
                threats, including other-universe versions of himself, which
                threaten to wipe out millions across the multiverse.
              </p>
            </div>

            <div className="text-sm">
              <p>
                Aired:<span className="font-bold"> 2022</span>
              </p>
              <p>
                Genres :<span className="font-bold"> Action, Adventure</span>
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export default Card
