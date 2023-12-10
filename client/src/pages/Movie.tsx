import MovieComment from "@/components/MovieComment"
import MovieOverview from "@/components/MovieOverview"
import MoviePlay from "@/components/MoviePlay"
import { trpc } from "@/trpc"
import { useParams } from "react-router-dom"

const Movie = () => {
  const { id } = useParams()

  if (id) {
    const { data, isLoading } = trpc.movie.getMovieById.useQuery({
      id,
    })

    if (data)
      return (
        <div className="w-full flex flex-col gap-5">
          <MovieOverview movie={data} />
          <MoviePlay movie={data} isLoading={isLoading} />
          <MovieComment movie={data} />
        </div>
      )
  }
  return <>no id provided</>
}

export default Movie
