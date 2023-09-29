import Card from "./Card"

const Latest = () => {
  return (
    <div className="px-2">
      <p className="text-xl text-primary font-bold pb-5 uppercase">Latest</p>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-10">
        {Array.from({ length: 10 }, (_, x) => x).map((_, idx) => (
          <Card key={idx} />
        ))}
      </div>
    </div>
  )
}

export default Latest
