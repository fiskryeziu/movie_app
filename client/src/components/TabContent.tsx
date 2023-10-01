import React from "react"
import img from "../assets/movie.jpg"
import { Star } from "lucide-react"

const TabContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3">
      {Array.from({ length: 10 }, (_, x) => x).map((_, idx) => (
        <div key={idx} className="flex gap-4 bg-secondary border-b-2 mb-[2px]">
          <div className="w-20 h-full">
            <img src={img} alt="" className="object-cover w-full h-full" />
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
        </div>
      ))}
    </div>
  )
}

export default TabContent
