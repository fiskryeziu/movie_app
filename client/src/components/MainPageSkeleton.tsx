import React from "react"
import { Skeleton } from "./ui/skeleton"

const MainPageSkeleton = () => {
  return (
    <>
      <div className="px-2 pt-5 pb-20">
        <p className="text-xl text-primary font-bold pb-5 uppercase">
          Trending
        </p>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-10">
          {Array.from({ length: 5 }, (_, x) => x).map((_, idx) => (
            <Skeleton key={idx} className="w-full h-60 aspect-[4:3]"></Skeleton>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-10">
        {Array.from({ length: 10 }, (_, x) => x).map((_, idx) => (
          <Skeleton key={idx} className="w-full h-60 aspect-[4:3]"></Skeleton>
        ))}
      </div>
    </>
  )
}

export default MainPageSkeleton
