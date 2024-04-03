import { ChevronRight, Clock, Film, Globe, Star } from "lucide-react";
import { Movie } from "types";

type TMovie = {
  movie: Movie;
};
const MovieOverview = ({ movie }: TMovie) => {
  return (
    <div className="my-10 flex w-full flex-col items-center justify-between gap-10 lg:flex-row">
      <div className="h-80 w-full lg:h-auto lg:w-1/4">
        <img
          src={movie.coverImageUrl}
          alt=""
          className="mx-auto h-full object-cover lg:h-auto"
        />
      </div>
      <div className="flex w-full  flex-col items-center lg:w-3/4 lg:items-start">
        <p className="text-xl uppercase text-primary">Overview</p>
        <p className="mb-10 max-w-lg text-center text-2xl uppercase lg:text-left">
          {movie.title}
        </p>
        <p className="mb-10 max-w-xl text-center lg:text-left">
          {movie.description}
        </p>
        <div className="flex w-auto flex-col gap-5 lg:w-full  lg:flex-row ">
          <div className="w-auto flex-col space-y-5 lg:w-1/2">
            <div className="flex gap-2">
              <Film className="text-primary" />
              <span className="flex font-bold"> Genre: </span>
              {movie.genre.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className="flex gap-2">
              <Star className="text-primary" />
              <span className="flex font-bold"> Rating: </span>
              <p>{movie.rating} </p>
            </div>
            <div className="flex gap-2">
              <Globe className="text-primary" />
              <span className="flex font-bold"> Year: </span>
              <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="w-auto flex-col space-y-5 lg:w-1/2">
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
  );
};

export default MovieOverview;
