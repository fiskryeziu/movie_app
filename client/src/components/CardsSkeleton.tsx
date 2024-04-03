import React from "react";
import { Skeleton } from "./ui/skeleton";

const CardsSkeleton = () => {
  return (
    <div className="mt-20 flex flex-col">
      <p className="pb-5 text-xl font-bold uppercase text-primary">
        Highest-rated
      </p>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-10">
        {Array.from({ length: 10 }, (_, x) => x).map((_, idx) => (
          <Skeleton className="aspect-[3/4]" key={idx} />
        ))}
      </div>
    </div>
  );
};

export default CardsSkeleton;
