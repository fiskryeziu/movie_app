import Card from "@/components/Card";
import CardsSkeleton from "@/components/CardsSkeleton";
import { trpc } from "@/trpc";
import React from "react";

const Popular = () => {
  const { data, isLoading } = trpc.movie.getMostRatedMovies.useQuery();

  if (isLoading) {
    return <CardsSkeleton />;
  }
  return (
    <div className="mt-20 flex flex-col">
      <p className="pb-5 text-xl font-bold uppercase text-primary">
        Most popular
      </p>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-10">
        {data &&
          data.map((movie, idx) => (
            <Card key={idx} isHidden={false} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Popular;
