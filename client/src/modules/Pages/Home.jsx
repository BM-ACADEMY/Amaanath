import React from "react";
import Banner from "../../assets/img/banner.png";

const Home = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center text-white font-sans"
      style={{ backgroundImage: `url(${Banner})` }}
    >
      {/* Centered Content (Fully Left Aligned) */}
      <div className="absolute bg-black/50 inset-0 flex items-center">
        <div className="max-w-2xl ml-6 sm:ml-10 md:ml-16 lg:ml-20">
          <p className="text-[#f0b100]  text-sm sm:text-base md:text-lg lg:text-xl mb-3 flex items-center gap-3">
            WELCOME TO OUR PROPERTY.
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -1 8 1"
              className="w-16 h-2"
            >
              <path
                d="M 0 0 L 1 -1 L 2 0 L 3 -1 L 4 0 L 5 -1 L 6 0 L 7 -1 L 8 0"
                stroke="#facc15"
                strokeWidth="0.15"
                fill="none"
              />
            </svg>
          </p>

          <h1 className="text-3xl font-quicksand sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            Looking For Proper House
          </h1>
          <div className="mt-6 flex flex-wrap gap-4">
            <button className="px-5 py-2 sm:px-6 sm:py-3 border border-white bg-white/20 hover:bg-white hover:text-black transition">
              Make An Schedule +
            </button>
            <button className="px-5 py-2 sm:px-6 sm:py-3 bg-white text-black hover:bg-white/20 border hover:border-white hover:text-white transition">
              Learn More +
            </button>
          </div>
        </div>
      </div>

      {/* Rotated Contact Info (Clickable Overlay) */}
      <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 transform rotate-270 origin-center text-white text-sm sm:text-base tracking-wide">
        <a
          href="mailto:info@webmail.comm"
          className="hover:text-yellow-400 transition"
        >
          info@webmail.comm
        </a>
        &nbsp; | &nbsp;
        <a
          href="tel:+908900888299"
          className="hover:text-yellow-400 transition"
        >
          +908 900 888 299
        </a>
      </div>
    </div>
  );
};

export default Home;
