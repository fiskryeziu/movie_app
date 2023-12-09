import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import { Autoplay } from "swiper/modules"
import { Movie } from "types"

const Carousel = ({ movies }: { movies: Movie[] }) => {
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
      autoplay={{
        delay: 2000,
      }}
      modules={[Autoplay]}
      className="w-full h-full z-0"
    >
      {movies?.map((movie) => (
        <SwiperSlide key={movie.id} className="text-4xl text-red-500">
          <div className="w-full h-auto aspect-[4:3]">
            <img
              src={movie?.coverImageUrl}
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
