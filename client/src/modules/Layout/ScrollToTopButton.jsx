import React, { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={[
        "fixed right-5 bottom-8 z-50 flex items-center justify-center w-12 h-12",
        "rounded-full text-white",
        "border-2",
        "transition-all duration-500 ease-out transform",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-20 pointer-events-none",
      ].join(" ")}
      style={{
        backgroundColor: "#b68d10", // solid bg color
        borderColor: "#b68d10",     // match border with bg
        boxShadow: "0 8px 20px rgba(182, 141, 16, 0.6)", // golden glow shadow
      }}
    >
      {/* Up arrow icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V6" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
