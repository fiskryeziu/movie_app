import MovieComment from "@/components/MovieComment"
import MovieOverview from "@/components/MovieOverview"
import MoviePlay from "@/components/MoviePlay"

const Movie = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <MovieOverview />
      <MoviePlay />
      <MovieComment />
    </div>
  )
}

export default Movie
