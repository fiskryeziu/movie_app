import Card from "@/components/Card"
import React from "react"

const Rated = () => {
  return (
    <div className="flex flex-col mt-20">
      <p className="text-xl text-primary font-bold pb-5 uppercase">
        Highest-rated
      </p>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-10">
        {Array.from({ length: 10 }, (_, x) => x).map((_, idx) => (
          <Card key={idx} isHidden={false} />
        ))}
      </div>
    </div>
  )
}

export default Rated
