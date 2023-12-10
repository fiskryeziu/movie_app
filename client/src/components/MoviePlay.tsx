import { Movie } from "types"
import { Skeleton } from "./ui/skeleton"
type TMovie = {
  movie: Movie
  isLoading: boolean
}
const MoviePlay = ({ movie, isLoading }: TMovie) => {
  return (
    <>
      <div className="w-full">
        {isLoading ? (
          <Skeleton className="w-full lg:h-[540px] sm:h-auto md:h-[400px]" />
        ) : (
          <iframe
            src={movie.movieURL}
            allowFullScreen
            className="w-full aspect-video lg:h-[540px] sm:h-auto md:h-[400px]"
          />
        )}
      </div>
      <div className="flex gap-5 mb-10">
        <button className="flex text-left rounded-md font-bold bg-secondary p-2 hover:bg-primary hover:duration-150 text-sm sm:text-base">
          Server 1
        </button>
        <button className="flex text-left rounded-md font-bold bg-secondary p-2 hover:bg-primary hover:duration-150 text-sm sm:text-base">
          Server 2
        </button>
        <button className="flex text-left rounded-md font-bold bg-secondary p-2 hover:bg-primary hover:duration-150 text-sm sm:text-base">
          Server 3
        </button>
      </div>
    </>
  )
}

export default MoviePlay
