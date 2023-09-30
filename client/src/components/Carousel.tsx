import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import img from "../assets/movie.jpg"
import { Autoplay } from "swiper/modules"

const Carousel = () => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={2}
      breakpoints={{
        479: {
          spaceBetween: 15,
        },
        575: {
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        900: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1300: {
          slidesPerView: 6,
          spaceBetween: 15,
        },
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 2000,
        // pauseOnMouseEnter: true,
      }}
      modules={[Autoplay]}
      className="w-full h-full z-0"
    >
      {Array.from({ length: 10 }, (_, x) => x).map((_, idx) => (
        <SwiperSlide key={idx} className="text-4xl text-red-500">
          <div className="w-full h-auto aspect-[4:3]">
            <img
              src={img}
              alt=""
              className="block w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
