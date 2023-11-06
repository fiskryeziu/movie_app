import Carousel from "@/components/Carousel"
import Footer from "@/components/Footer"
import Latest from "@/components/Latest"
import MostViewed from "@/components/MostViewed"
import Upcoming from "@/components/Upcoming"

const Main = () => {
  return (
    <>
      <div className="px-2 pt-5 pb-20">
        <p className="text-xl text-primary font-bold pb-5 uppercase">
          Trending
        </p>
        <Carousel />
      </div>
      <Latest />
      <MostViewed />
      <Upcoming />
      <Footer />
    </>
  )
}

export default Main
