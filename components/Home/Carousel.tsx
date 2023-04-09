import Image from 'next/image';
import { FC, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import "swiper/css"

import { Navigation, Swiper as SwiperType, Autoplay } from "swiper";

interface CarouselProps { }

const Carousel: FC<CarouselProps> = ({ }) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={900}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper
      }}
      className='relative'
      slidesPerView={'auto'}
    >
      <SwiperSlide>
        <div className='w-full h-screen max-h-[700px]'>
          <Image src={'https://res.cloudinary.com/furakam/image/upload/v1681011753/cmgarments/portada_1_yisxmv.jpg'} fill alt='portada_1.png' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full h-screen max-h-[700px]'>
          <Image src={'https://res.cloudinary.com/furakam/image/upload/v1681011753/cmgarments/portada_2_kpjcfd.jpg'} fill alt='portada_1.png' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full h-screen max-h-[700px]'>
          <Image src={'https://res.cloudinary.com/furakam/image/upload/v1681011753/cmgarments/portada_3_ptw1of.jpg'} fill alt='portada_1.png' />
        </div>
      </SwiperSlide>
      <div
        className='absolute top-[40%] lg:top-[50%] left-3 z-10'
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <BiChevronLeft size={40} className='text-white bg-cyan-500 rounded-full cursor-pointer' />
      </div>
      <div
        className='absolute top-[40%] lg:top-[50%] right-3 z-10'
        onClick={() => swiperRef.current?.slideNext()}
      >
        <BiChevronRight size={40} className='text-white bg-cyan-500 rounded-full cursor-pointer' />
      </div>
    </Swiper>
  );
}
export default Carousel;