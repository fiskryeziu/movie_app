import MovieComment from "@/components/MovieComment"
import MovieOverview from "@/components/MovieOverview"
import MoviePlay from "@/components/MoviePlay"
import MovieSkeleton from "@/components/MovieSkeleton"
import { trpc } from "@/trpc"
import { useParams } from "react-router-dom"

const Movie = () => {
  const { id } = useParams() as { id: string }

  const { data, isLoading, isFetching } = trpc.movie.getMovieById.useQuery({
    id,
  })

  return (
    <div className="w-full flex flex-col gap-5">
      {(isLoading || isFetching) && <MovieSkeleton />}

      {data && (
        <>
          <MovieOverview movie={data} />
          <MoviePlay movie={data} isLoading={isLoading} />
          <MovieComment movie={data} />
        </>
      )}
    </div>
  )
}

export default Movie
