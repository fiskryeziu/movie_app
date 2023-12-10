import { ChevronRight, Clock, Film, Globe, Star } from "lucide-react"
import { Movie } from "types"

type TMovie = {
  movie: Movie
}
const MovieOverview = ({ movie }: TMovie) => {
  return (
    <div className="w-full flex my-10 flex-col lg:flex-row justify-between items-center gap-10">
      <div className="w-full lg:w-1/4 lg:h-auto h-80">
        <img
          src={movie.coverImageUrl}
          alt=""
          className="object-cover h-full lg:h-auto mx-auto"
        />
      </div>
      <div className="flex flex-col  w-full lg:w-3/4 items-center lg:items-start">
        <p className="text-xl uppercase text-primary">Overview</p>
        <p className="text-2xl uppercase max-w-lg mb-10 text-center lg:text-left">
          {movie.title}
        </p>
        <p className="max-w-xl mb-10 lg:text-left text-center">
          {movie.description}
        </p>
        <div className="w-auto lg:w-full flex flex-col gap-5  lg:flex-row ">
          <div className="w-auto lg:w-1/2 flex-col space-y-5">
            <div className="flex gap-2">
              <Film className="text-primary" />
              <span className="flex font-bold"> Genre: </span>
              {movie.genre.map((item) => (
                <p>{item}</p>
              ))}
            </div>
            <div className="flex gap-2">
              <Star className="text-primary" />
              <span className="flex font-bold"> Rating: </span>
              <p>7.3/10 </p>
            </div>
            <div className="flex gap-2">
              <Globe className="text-primary" />
              <span className="flex font-bold"> Year: </span>
              <p>2022 </p>
            </div>
          </div>
          <div className="w-auto lg:w-1/2 flex-col space-y-5">
            <div className="flex gap-2">
              <Clock className="text-primary" />
              <span className="flex font-bold"> Duration: </span>
              <p>
                {Math.floor(movie.duration / 60)}h {movie.duration & 60}min
              </p>
            </div>
            <div className="flex gap-2">
              <ChevronRight className="text-primary" />
              <span className="flex font-bold"> Quality: </span>
              <p className="text-primary">HD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieOverview
