import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1332&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1332&auto=format&fit=crop",
];

const LuxuryOverview = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row justify-center max-w-7xl mx-auto px-10 py-18 md:gap-20 gap-10">
      {/* Left Side */}
      <div className="md:w-1/3 flex flex-col gap-6 md:items-start">
        <div className="flex items-center gap-2">
          <span className="text-[#f0b100] font-bold uppercase text-base">
            Overview
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -1 8 1"
            className="w-12 sm:w-16 h-2"
          >
            <path
              d="M 0 0 L 1 -1 L 2 0 L 3 -1 L 4 0 L 5 -1 L 6 0 L 7 -1 L 8 0"
              stroke="#f0b100"
              strokeWidth="0.15"
              fill="none"
            />
          </svg>
        </div>{" "}
        <h2 className="text-4xl font-quicksand sm:text-5xl md:text-6xl font-bold whitespace-nowrap">
          Luxury House
        </h2>
        <div className="flex items-center gap-2 text-lg">
          <span className="ml-2">
            Join Our{" "}
            <span className="font-bold text-[#f0b100]">5000+ Community</span>
          </span>
        </div>
        {/* Prev/Next Buttons */}
        <div className="flex gap-8 mt-6">
          <button
            ref={prevRef}
            disabled={activeIndex === 0}
            className={`px-6 py-4 text-lg font-semibold border  rounded transition flex items-center justify-center
    ${
      activeIndex === 0
        ? "bg-gray-100 text-gray-400"
        : "hover:bg-[#bf9410] hover:text-white active:bg-[#bf9410] active:text-white"
    }`}
          >
            <FaArrowLeftLong size={24} />
          </button>

          <button
            ref={nextRef}
            disabled={activeIndex === images.length - 1}
            className={`px-6 py-4 text-lg font-semibold border rounded transition flex items-center justify-center
    ${
      activeIndex === images.length - 1
        ? "bg-gray-100 text-gray-400 "
        : "hover:bg-[#bf9410] hover:text-white active:bg-[#bf9410] active:text-white"
    }`}
          >
            <FaArrowRightLong size={24} />
          </button>
        </div>
      </div>

      {/* Right Side - Image Carousel */}
      <div className="md:w-2/3 w-full">
        <Swiper
          modules={[Navigation]}
          loop={false} // no loop
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="rounded-lg overflow-hidden"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`slide-${idx}`}
                className="w-full h-[400px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LuxuryOverview;
