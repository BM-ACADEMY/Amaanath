import React from "react";
import Marquee from "react-fast-marquee";

import img1 from "@/assets/brands/AL_AMAANATH.png";
import img2 from "@/assets/brands/bezooz.png";
import img3 from "@/assets/brands/BM_ACADEMY.png";
import img4 from "@/assets/brands/BM_TECHX.png";
import img5 from "@/assets/brands/DADAS.png";
import img6 from "@/assets/brands/edu.png";
import img7 from "@/assets/brands/foundation.png";
import img8 from "@/assets/brands/HARAMAIN.png";
import img9 from "@/assets/brands/travel.png";

// Import your background image
import bgImage from "@/assets/img/ourbrands.png"; 

const BrandsMarquee = () => {
  const brands = [
    { src: img1, url: "https://www.instagram.com/al_amaanath?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { src: img2, url: "https://bezooz.com/in" }, 
    { src: img3, url: "https://thebmacademy.com/" },
    { src: img4, url: "https://bmtechx.in/" },
    { src: img5, url: "https://www.instagram.com/_dadaskitchen_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { src: img6, url: "" }, 
    { src: img7, url: "#" }, 
    { src: img8, url: "https://www.instagram.com/haramain_haj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { src: img9, url: "https://travellersneed-client.onrender.com/" },
  ];

  return (
    <div
      id="brands"
      className="overflow-hidden w-full relative py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Text + content wrapper */}
      <div className="relative z-20">
        <div className="flex items-center justify-center mt-4">
          <p className="uppercase font-bold text-lg mb-2 text-white">Our Brands</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -1 8 1"
            className="w-12 sm:w-16 h-2 ml-4"
          >
            <path
              d="M 0 0 L 1 -1 L 2 0 L 3 -1 L 4 0 L 5 -1 L 6 0 L 7 -1 L 8 0"
              stroke="#fff"
              strokeWidth="0.15"
              fill="none"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-quicksand sm:text-4xl md:text-6xl font-bold mb-12 text-white text-center">
          Our Trusted Brands
        </h2>

        <div className="relative max-w-6xl mx-auto">
          <Marquee
            direction="left"
            speed={80}
            gradient={false}
            pauseOnHover={true}
            className="py-4"
          >
            {brands.map((brand, index) => (
              <div key={index} className="mx-12 transition relative z-10">
                <a
                  href={brand.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={brand.src}
                    alt={`brand-${index}`}
                    className="h-28 w-auto drop-shadow-lg hover:scale-105 transition-transform"
                  />
                </a>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default BrandsMarquee;
