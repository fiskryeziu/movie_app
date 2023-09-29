import Carousel from "@/components/Carousel"
import Latest from "@/components/Latest"

const Main = () => {
  return (
    <>
      <div className="px-2 py-5">
        <p className="text-xl text-primary font-bold pb-5 uppercase">
          Trending
        </p>
        <Carousel />
      </div>
      <Latest />
    </>
  )
}

export default Main
