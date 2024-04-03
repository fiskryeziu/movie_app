import React from "react";
import Card from "./Card";
import { Movie } from "types";

const Upcoming = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="my-16 flex flex-col px-2">
      <p className="pb-5 text-xl font-bold uppercase text-primary">upcoming</p>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-10">
        {movies?.map((movie) => (
          <Card movie={movie} key={movie.id} isHidden={false} />
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
