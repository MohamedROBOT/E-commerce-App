"use client"
import React, {  useState } from 'react';
// Import Swiper React components
import { Swiper , SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from "swiper";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { IProduct } from '@/interfaces/products.interface';

export default function ProductSwiper({product} : {product : IProduct}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <Swiper
      
        loop={true}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-3 !h-4/5 lg:!h-1/2 !w-4/5 lg:!w-1/3  "
      >
        {
            product.images.map((image, index) => (
              
<SwiperSlide key={index} >
          <Image loading='lazy' width={200} height={200}   src={image} alt={product.title}  />
        </SwiperSlide>             
            ))
        }
       
        
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={2}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper invisible md:visible"
      >
        {
            product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image loading='lazy' width={200} height={50} src={image}  alt={product.title}  />
              </SwiperSlide>
            ))
        }
        {
            product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image loading='lazy' width={200} height={50} src={image}  alt={product.title}  />
              </SwiperSlide>
            ))
        }
       
        
       
      </Swiper>

      
    </>
  );
}
