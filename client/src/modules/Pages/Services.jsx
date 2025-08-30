import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsHouses } from "react-icons/bs";
import { IoIosBusiness } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ServicesImg from "../../assets/img/Services.jpg";

const propertyFeatures = [
  {
    subtitle: "Property Action",
    title: "Buy",
    icon: <AiOutlineHome className="text-yellow-500 text-2xl sm:text-3xl transition-colors duration-300 group-hover:text-white" />,
    path: "/buy",
  },
  {
    subtitle: "Property Action",
    title: "Sell",
    icon: <BsHouses className="text-yellow-500 text-2xl sm:text-3xl transition-colors duration-300 group-hover:text-white" />,
    path: "/sell",
  },
  {
    subtitle: "Partnerships",
    title: "Business Deal",
    icon: <IoIosBusiness className="text-yellow-500 text-2xl sm:text-3xl transition-colors duration-300 group-hover:text-white" />,
    path: "/business-deal",
  },
];

const Servcies = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white flex items-center justify-center px-4 sm:px-8 py-10 sm:py-14" id="about">
      <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center max-w-7xl w-full">
        {/* Left Side - House Plan Image */}
        <div className="overflow-hidden shadow-2xl rounded-xl">
          <img
            src={ServicesImg}
            alt="House Plan"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Property Details */}
        <div>
          {/* About Property with SVG */}
          <div className="flex items-center gap-3">
            <p className="text-[#f0b100] font-semibold uppercase tracking-wider text-base sm:text-lg">
              About Property
            </p>
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
          </div>

          <h2 className="text-3xl font-quicksand sm:text-5xl md:text-6xl font-bold mt-4 leading-tight">
            Private Residental <br /> House For Sale
          </h2>

          {/* Property Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
            {propertyFeatures.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="group bg-zinc-900 rounded-xl p-4 sm:p-6 flex justify-between items-center shadow-lg cursor-pointer transition-all duration-300 hover:bg-[#bf9410]"
              >
                <div>
                  <p className="text-gray-400 text-sm sm:text-base transition-colors duration-300 group-hover:text-white">
                    {item.subtitle}
                  </p>
                  <h4 className="text-lg sm:text-xl font-semibold transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h4>
                </div>
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servcies;
