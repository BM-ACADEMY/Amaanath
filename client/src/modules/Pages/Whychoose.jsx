import React from "react";
import {
  AiOutlineHome,
  AiOutlineKey,
  AiOutlineProfile,
  AiOutlineInfoCircle,
  AiOutlineShop,
  AiOutlineTool,
} from "react-icons/ai";

const features = [
  { icon: <AiOutlineHome className="text-6xl" />, title: "Residence" },
  { icon: <AiOutlineKey className="text-6xl" />, title: "Eco Living" },
  { icon: <AiOutlineProfile className="text-6xl" />, title: "Quality" },
  { icon: <AiOutlineInfoCircle className="text-6xl" />, title: "Info Desk" },
  { icon: <AiOutlineShop className="text-6xl" />, title: "Reception" },
  { icon: <AiOutlineTool className="text-6xl" />, title: "24/7 Support" },
];

const Whychoose = () => {
  return (
    <div className="bg-[#bf9410] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mt-4">
          <p className="uppercase font-bold text-lg mb-2">Features</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -1 8 1"
            className="w-12 sm:w-16 h-2 ml-4"
          >
            <path
              d="M 0 0 L 1 -1 L 2 0 L 3 -1 L 4 0 L 5 -1 L 6 0 L 7 -1 L 8 0"
              stroke="#ffff"
              strokeWidth="0.15"
              fill="none"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-quicksand sm:text-4xl md:text-6xl font-bold mb-12">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-opacity-20 border border-white border-opacity-30 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-opacity-30 transition cursor-pointer h-42" // taller for big icons
            >
              <div className="transform transition-transform duration-700 ease-in-out group-hover:rotate-y-360">
                {feature.icon}
              </div>
              <p className="mt-4 font-semibold">{feature.title}</p>
            </div>
          ))}
        </div>

       <div className="flex flex-col sm:flex-row justify-center gap-6">
  <button className="bg-black text-white px-10 py-4 rounded-lg font-semibold flex items-center justify-center text-lg hover:bg-white hover:text-black transition">
    Make Request <span className="ml-3">+</span>
  </button>
  <button className="bg-white text-black px-10 py-4 rounded-lg font-semibold flex items-center justify-center text-lg hover:bg-black hover:text-white transition">
    Free Tour <span className="ml-3">+</span>
  </button>
</div>

      </div>
    </div>
  );
};

export default Whychoose;
