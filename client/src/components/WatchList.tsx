import React from "react"
import Card from "./Card"

const WatchList = () => {
  return (
    <div className="flex flex-col gap-2 p-2 items-start">
      <p className="text-primary font-semibold">Continue Watching</p>
      <div className="grid grid-cols-3 max-w-xs gap-4 ">
        {Array.from({ length: 3 }, (_, x) => x).map((_, idx) => (
          <Card key={idx} isHidden={true} />
        ))}
      </div>
      <button className="bg-primary rounded-sm px-2 text-sm mx-auto">
        Clear
      </button>
    </div>
  )
}

export default WatchList
