"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import slide1 from "@/assets/images/slider-image-1.jpeg";
import slide2 from "@/assets/images/slider-image-2.jpeg";
import slide3 from "@/assets/images/slider-image-3.jpeg";
import slide4 from "@/assets/images/slider-image-4.jpeg";
import Image from "next/image";

export default function MainSlider() {
  const swiperOptions = {
    pagination:{
        
        clickable: true,
        bulletClass: 'swiper-pagination-bullet !bg-gray-500 !size-3',
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-500 !opacity-100 border-2 border-white',
        
    },
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    modules: [Pagination, Autoplay],
   
  };

  const images = [
     {
      path: slide4.src,
      title: "Slide 4",
    },
    {
      path: slide1.src,
      title: "Slide 1",
    },
    {
      path: slide2.src,
      title: "Slide 2",
    },
    {
      path: slide3.src,
      title: "Slide 3",
    },
   
  ];
  return (
    <Swiper  {...swiperOptions}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image loading="lazy" width={1920} height={300} src={image.path} alt={image.title} 
          className="w-full h-86 object-cover "
          />
        </SwiperSlide>
      ))}
     
    </Swiper>
  );
}
