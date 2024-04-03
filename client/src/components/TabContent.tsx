import React from "react"
import img from "../assets/movie.jpg"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"

const TabContent = () => {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 lg-grid-cols-3">
      {Array.from({ length: 10 }, (_, x) => x).map((_, idx) => (
        <Link
          to={`/movie/${idx}`}
          key={idx}
          className="flex gap-4 bg-secondary border-b-2 dark:border-none mb-1 ml-1"
        >
          <div className="w-20 h-full">
            <LazyLoadImage src={img} />
          </div>
          <div className="flex flex-col justify-around">
            <p className="font-bold">
              Doctor Strange in the Multiverse of Madness
            </p>
            <div className="flex items-center gap-2">
              <Star color="yellow" size={16} fill="yellow" /> <p>8.4</p>
            </div>
            <p>2h 6m</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default TabContent
