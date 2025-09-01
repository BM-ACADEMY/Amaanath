import React, { useState, useEffect } from "react";
import Logo from "@/assets/img/testimonial-logo.png";

const reviews = [
  {
    id: 1,
    text: `D. Dowson found the product extremely useful and praised the excellent customer support. He recommends it to anyone looking for reliable solutions.`,
    name: "D. Dowson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    text: `J. Smith appreciated the intuitive design and seamless performance. She mentioned that it greatly improved her daily workflow.`,
    name: "J. Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const UserFeedback = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
        setFade(true); // fade in new slide
      }, 500); // duration of fade-out
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const { text, name, avatar } = reviews[current];

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-16 flex flex-col items-center" id="testimonials">
      {/* Centered Logo */}
      <img src={Logo} alt="Logo" className="w-20 h-20 mb-6" />

      {/* Review Card */}
      <div
        className={`flex flex-col items-center text-center bg-white p-8 rounded-lg min-h-[300px] w-full transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-quicksand font-bold mb-6">User Feedback</h2>

        {/* Review Text */}
        <p className="text-gray-500 font-quicksand mb-8 text-[30px] leading-relaxed">{text}</p>

        {/* User Info */}
        <div className="flex flex-col items-center">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full mb-2 border-2 border-yellow-500"
          />
          <h3 className="font-semibold text-lg font-quicksand">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;
