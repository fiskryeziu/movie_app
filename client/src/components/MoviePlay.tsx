import { Movie } from "types"
import { Skeleton } from "./ui/skeleton"
import { trpc } from "@/trpc"
import ReactPlayer from "react-player/streamable"
import { useEffect } from "react"
type TMovie = {
  movie: Movie
  isLoading: boolean
}

const MoviePlay = ({ movie, isLoading }: TMovie) => {
  const { mutate } = trpc.movie.incrementView.useMutation({
    onSuccess: () => {
      console.log("success")
    },
    onError: () => {
      console.log("error")
    },
  })

  useEffect(() => {
    const hasViewed = localStorage.getItem(`viewed_${movie.id}`)

    // Only increment view count if the user has not viewed the movie before
    if (!hasViewed && movie.id) {
      mutate({
        movieId: movie.id,
      })
    }
  }, [movie.id, mutate])

  return (
    <>
      <div className="w-full">
        {isLoading ? (
          <Skeleton className="w-full lg:h-[540px] sm:h-auto md:h-[400px]" />
        ) : (
          <div className="w-full h-0 relative pb-[56.250%]">
            <ReactPlayer
              url={movie.movieURL}
              width="100%"
              height="100%"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0px",
                top: "0px",
                overflow: "hidden",
              }}
            />
          </div>
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
