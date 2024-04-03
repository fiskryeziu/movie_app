import React from "react"
import { Skeleton } from "./ui/skeleton"

function MovieSkeleton() {
  return (
    <div className="w-full flex my-10 flex-col lg:flex-row justify-between items-center gap-10">
      <div className="w-full lg:w-1/4 lg:h-auto h-80">
        <Skeleton className="w-52 h-80 m-auto" />
      </div>
      <div className="flex flex-col gap-5  w-full lg:w-3/4 items-center lg:items-start">
        <Skeleton className="w-80 h-2" />
        <Skeleton className="w-80 h-2" />

        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
      </div>
    </div>
  )
}

export default MovieSkeleton
