import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHome } from "react-icons/ai"; // 🏠 House icon
import { Link } from "react-router-dom"; // ✅ React Router

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* AnimatePresence wraps both floating elements */}
      <AnimatePresence>
        {visible && (
          <>
            {/* Scroll to Top */}
            <motion.button
              key="scrollToTop"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed right-5 bottom-8 z-50 flex items-center justify-center w-12 h-12 rounded-full text-white border-2"
              style={{
                backgroundColor: "#b68d10",
                borderColor: "#b68d10",
                boxShadow: "0 8px 20px rgba(182, 141, 16, 0.6)",
              }}
            >
              {/* Up arrow */}
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
            </motion.button>

            {/* Floating Menu */}
            <motion.div
              key="floatingMenu"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed right-5 bottom-24 z-50 flex flex-col items-end space-y-3"
            >
              {/* Sub Buttons with Animation */}
              <AnimatePresence>
                {menuOpen && (
                  <>
                    {[
                      { label: "Buy", path: "/buy" },
                      { label: "Sell", path: "/sell" },
                      { label: "Business Deal", path: "/business-deal" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          className="px-4 py-2 rounded-full bg-[#b68d10] text-white shadow-md hover:scale-105 block"
                          onClick={() => setMenuOpen(false)} // close menu on navigation
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Main Toggle Button */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: "#b68d10",
                  boxShadow: "0 8px 20px rgba(182, 141, 16, 0.6)",
                }}
              >
                {menuOpen ? (
                  // Close icon
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  // House Icon
                  <AiOutlineHome size={22} color="white" />
                )}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
