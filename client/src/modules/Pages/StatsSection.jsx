import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const StatsSection = () => {
  const stats = [
    { value: 5, suffix: "k", label: "SQUARE AREA" },
    { value: 200, suffix: "+", label: "CAR PARKING" },
    { value: 10, suffix: "k", label: "APARTMENTS" },
    { value: 700, suffix: "k", label: "ROOMS" },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="bg-[#18181b] py-16 sm:py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mt-4">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-quicksand">
    Our <span className="text-[#f0b100]">Achievements</span>
  </h2>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -1 8 1"
    className="w-12 sm:w-16 h-2 ml-4"
  >
    <path
      d="M 0 0 L 1 -1 L 2 0 L 3 -1 L 4 0 L 5 -1 L 6 0 L 7 -1 L 8 0"
      stroke="#f0b100"
      strokeWidth="0.15"
      fill="none"
    />
  </svg>
</div>

        <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          Delivering excellence in real estate with trusted properties and satisfied clients.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Number with scale animation */}
            <motion.h2
              initial={{ scale: 0.8 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="text-4xl font-quicksand sm:text-5xl md:text-7xl font-extrabold text-[#f0b100]"
            >
              {inView && <CountUp end={item.value} duration={3} />}
              {item.suffix}
            </motion.h2>

            {/* Label */}
            <p className="mt-2 text-sm sm:text-base font-semibold uppercase tracking-wide text-gray-300">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
