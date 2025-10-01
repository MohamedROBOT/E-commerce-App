"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination } from "swiper/modules";
import { ICategory } from "@/interfaces/categories.interface";
import Image from "next/image";

export default function CategoriesSlider({
  categories,
}: {
  categories: ICategory[];
}) {
  const swiperOptions = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
      
    },
    loop: true,
   pagination:{
        
        clickable: true,
        bulletClass: 'swiper-pagination-bullet !size-3 ',
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-500',
        
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
    

    modules: [EffectCoverflow, Pagination],
  };
  return (
   
      <Swiper className="mySwiper" {...swiperOptions}>
        {categories &&
          categories.map((category) => {
            return (
              <SwiperSlide key={category._id} className="mb-6 !bg-transparent text-center !opacity-100">
                <div className=" size-44 mx-auto transition-all duration-200 flex flex-col justify-center items-center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="size-44 shadow-sm shadow-gray-300 rounded-2xl "
                    loading="lazy"
                  />
                  <h3 className="mt-2">{category.name}</h3>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    
  );
}
