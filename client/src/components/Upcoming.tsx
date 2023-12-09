import React from "react"
import Card from "./Card"
import { Movie } from "types"

const Upcoming = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="flex flex-col my-16 px-2">
      <p className="text-xl text-primary font-bold pb-5 uppercase">upcoming</p>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-10">
        {movies?.map((movie) => (
          <Card movie={movie} key={movie.id} isHidden={false} />
        ))}
      </div>
    </div>
  )
}

export default Upcoming
