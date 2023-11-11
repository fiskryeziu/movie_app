import { Play } from "lucide-react"

const MoviePlay = () => {
  return (
    <>
      <div>
        <iframe
          src="https://hqq.ac/e/T0lYTWNhcE1sQk53NDlJOGozRGIwZz09"
          allowFullScreen
          className="w-full aspect-video lg:h-[540px] sm:h-auto md:h-[400px]"
        />
      </div>
      <div className="flex gap-5 mb-10">
        <button className="flex text-left rounded-md font-bold bg-secondary p-2 hover:bg-primary hover:duration-150">
          Server 1 <Play />
        </button>
        <button className="flex text-left rounded-md font-bold bg-secondary p-2 hover:bg-primary hover:duration-150">
          Server 2 <Play />
        </button>
        <button className="flex text-left rounded-md font-bold bg-secondary p-2 hover:bg-primary hover:duration-150">
          Server 3 <Play />
        </button>
      </div>
    </>
  )
}

export default MoviePlay
