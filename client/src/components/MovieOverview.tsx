import { ChevronRight, Clock, Film, Globe, Star } from "lucide-react"
import poster from "../assets/movie.jpg"

const MovieOverview = () => {
  return (
    <div className="w-full flex my-10 flex-col lg:flex-row gap-10 ">
      <div className="w-1/4 h-full ">
        <img src={poster} alt="" className="object-cover" />
      </div>
      <div className="flex flex-col w-3/4">
        <p className="text-xl uppercase text-primary">Overview</p>
        <p className="text-2xl uppercase max-w-lg mb-10">
          Doctor Strange in the Multiverse of Madness (2022)
        </p>
        <p className="max-w-xl mb-10">
          Doctor Strange, with the help of mystical allies both old and new,
          traverses the mind-bending and dangerous alternate realities of the
          Multiverse to confront a mysterious new adversary.
        </p>
        <div className="w-full flex">
          <div className="w-1/2 flex-col space-y-5">
            <div className="flex gap-2">
              <Film className="text-primary" />
              <span className="flex font-bold"> Genre: </span>
              <p>Fantasy, Action, Adventure </p>
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
          <div className="w-1/2 flex-col space-y-5">
            <div className="flex gap-2">
              <Clock className="text-primary" />
              <span className="flex font-bold"> Duration: </span>
              <p>2h 10min </p>
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
