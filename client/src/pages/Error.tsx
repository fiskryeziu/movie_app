import { Home } from "lucide-react"
import React from "react"
import gauntlet from "../assets/gauntlet.png"
import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="flex w-full h-full flex-col items-center gap-5">
      <div className="flex flex-col items-center">
        <p className="text-primary font-black text-9xl">404</p>
        <p className="text-2xl text-gray-600 font-thin uppercase">
          page not found
        </p>
      </div>
      <img src={gauntlet} alt="" className="object-cover w-24" />
      <div className="flex flex-col items-center">
        <p className="capitalize text-primary text-3xl font-black">Oh Snap!</p>
        <p className="text-center text-sm text-gray-600">
          Seems like our servers got dusted in space! <br />
          Our Avengers are working on getting our universe back to normal
        </p>
      </div>

      <Link
        to={"/"}
        className="bg-primary flex items-center px-4 py-2 rounded-xl gap-2"
      >
        <Home size={18} />
        <p className="uppercase">go back in time</p>
      </Link>
    </div>
  )
}

export default Error
