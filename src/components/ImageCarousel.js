// components/CoverflowCarousel.js
"use client"
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';

const carouselImages = [
  '/carousel/1.jpg',
  '/carousel/2.jpg',
  '/carousel/3.jpg',
  '/carousel/4.jpg',
  '/carousel/5.jpg',
  '/carousel/6.jpg',
  '/carousel/0.jpg',
  '/carousel/10.jpg',
  '/carousel/7.jpg',
  '/carousel/11.jpg',
  '/carousel/8.jpg',
  '/carousel/9.jpg',
];



export default function Carousel() {

  return (
    <section className="coverflow-carousel-container mx-auto md:w-6/12 max-w-0 pt-14">
      <Swiper
        modules={[Autoplay, EffectCoverflow, Navigation]}
        effect="coverflow"
        spaceBetween={15}
        slidesPerView={3}  // Show three slides at a time
        centeredSlides={true}  // Center the active slide
        coverflowEffect={{
          rotate: -360,  // Adjust rotation for a better 3D effect
          stretch: 0,
          depth: 90,  // Increase depth to show more of the adjacent slides
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="w-full h-full"
      >
        {carouselImages.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <Image
              src={src}
              alt={`Feature ${index + 1}`}
              //layout="fill"
              width={300}
              height={100}
              objectFit="cover"
              className="rounded-md shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* <div className="swiper-button-next bg-white"></div>
      <div className="swiper-button-prev"></div> */}
      <style jsx>{`
        .coverflow-carousel-container {
          position: relative;
          overflow: hidden;
          margin: 0 auto;
          max-width: 100%; /* Ensure it does not exceed the container width */
        }
        .swiper-slide {
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }
        .swiper-slide-active {
          opacity: 1;
        }
        .swiper-slide-next,
        .swiper-slide-prev {
          transform: scale(0.8);
          opacity: 0.7;
        }
        .swiper-slide-next {
          transform: translateX(30px) scale(0.8);
        }
        .swiper-slide-prev {
          transform: translateX(-30px) scale(0.8);
        }
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background: rgba(0, 0, 0, 0.2);
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 24px;
        }
      `}</style>
    </section>
  );
}
