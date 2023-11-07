import React from "react"
import Card from "./Card"
import { Link } from "react-router-dom"

const Upcoming = () => {
  return (
    <div className="flex flex-col my-16 px-2">
      <p className="text-xl text-primary font-bold pb-5 uppercase">upcoming</p>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-10">
        {Array.from({ length: 5 }, (_, x) => x).map((_, idx) => (
          <Link to={`/movie/${idx}`}>
            <Card />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Upcoming
