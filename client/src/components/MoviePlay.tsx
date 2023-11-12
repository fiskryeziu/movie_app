import { Skeleton } from "./ui/skeleton"
import { useState } from "react"

const MoviePlay = () => {
  const [loading, setLoading] = useState(true)
  const handleLoader = () => {
    setLoading(false)
  }
  return (
    <>
      <div className="w-full">
        {loading && (
          <Skeleton className="w-full lg:h-[540px] sm:h-auto md:h-[400px]" />
        )}
        <iframe
          src="https://hqq.ac/e/T0lYTWNhcE1sQk53NDlJOGozRGIwZz09"
          allowFullScreen
          className="w-full aspect-video lg:h-[540px] sm:h-auto md:h-[400px]"
          onLoad={handleLoader}
        />
      </div>
      <div className="flex gap-5 mb-10">
        <button className="flex text-left rounded-md font-bold bg-secondary p-2 hover:bg-primary hover:duration-150 text-sm sm:text-base">
          Server 1
        </button>
        <button className="flex text-left rounded-md font-bold bg-secondary p-2 hover:bg-primary hover:duration-150 text-sm sm:text-base">
          Server 2
        </button>
        <button className="flex text-left rounded-md font-bold bg-secondary p-2 hover:bg-primary hover:duration-150 text-sm sm:text-base">
          Server 3
        </button>
      </div>
    </>
  )
}

export default MoviePlay
