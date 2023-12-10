import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Star } from "lucide-react"
import { Movie } from "types"

type CardContent = {
  isHidden: boolean
  movie: Movie
}
const Card = ({ movie, isHidden = false }: CardContent) => {
  return (
    <div className="w-full h-auto aspect-[4:3] hover:-translate-y-1 hover:duration-200 duration-75">
      <HoverCard closeDelay={0}>
        <HoverCardTrigger href={`/movie/${movie?.id}`}>
          <img
            src={movie.coverImageUrl}
            alt="movie"
            className="block w-full h-full object-cover"
          />
        </HoverCardTrigger>
        <HoverCardContent hidden={isHidden}>
          <div>
            <div className="mb-2">
              <p className="text-xl line-clamp-2 font-bold">{movie?.title}</p>
              <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-2">
                  <Star color="yellow" size={16} fill="yellow" />{" "}
                  <p>{movie?.rating}</p>
                </div>
                <p>{movie?.duration}</p>
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
