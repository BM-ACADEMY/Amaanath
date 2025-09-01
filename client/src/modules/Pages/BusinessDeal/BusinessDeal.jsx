import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const BusinessDeal = () => {
  const [openForm, setOpenForm] = useState(false);
  const [category, setCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    freeTime: "",
  });

  const formRef = useRef(null);

  const buttons = [
    "Partner With Us",
    "Work With Us",
    "Business Opportunities",
    "Promote & Branding",
    "Submit Your Proposal",
  ];

  // ✅ Map headings to taglines
  const taglines = {
    "Partner With Us": "Join hands to grow together and achieve mutual success.",
    "Work With Us": "Collaborate and build innovative solutions with our team.",
    "Business Opportunities": "Explore exciting opportunities and expand your reach.",
    "Promote & Branding": "Boost your brand visibility with our platform.",
    "Submit Your Proposal": "Share your ideas and let’s bring them to life.",
  };

  const handleButtonClick = (cat) => {
    setCategory(cat);
    setOpenForm(true);
    if (formRef.current && window.innerWidth < 768) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `New Business Deal Request:
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Category: ${category}
Free Time: ${formData.freeTime}`;

    const whatsappUrl = `https://wa.me/+919600815824?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative mt-22 z-10 w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Buttons Section */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4 md:w-1/3"
          >
            {buttons.map((btn, idx) => {
              const isActive = category === btn;
              return (
                <button
                  key={idx}
                  onClick={() => handleButtonClick(btn)}
                  className={`px-6 py-3 rounded-lg border text-base font-medium transition-all w-full
                    ${
                      isActive
                        ? "bg-[#b68d10] text-white border-[#b68d10] shadow-lg"
                        : "bg-white/80 text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105"
                    }`}
                >
                  {btn}
                </button>
              );
            })}
          </motion.div>

          {/* Form Section */}
          <AnimatePresence>
            {openForm && (
              <motion.div
                ref={formRef}
                initial={isMobile ? { y: 50, opacity: 0 } : { x: 50, opacity: 0 }}
                animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
                exit={isMobile ? { y: 50, opacity: 0 } : { x: 50, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-6 rounded-xl shadow-lg border md:w-1/2"
              >
                {/* ✅ Heading & tagline */}
                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                  {category}
                </h2>
                <p className="text-gray-600 mb-6">{taglines[category]}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b68d10] outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b68d10] outline-none"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b68d10] outline-none"
                  />
                  <input
                    type="time"
                    name="freeTime"
                    placeholder="Your free time"
                    value={formData.freeTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b68d10] outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#b68d10] text-white font-medium hover:opacity-90"
                  >
                    Submit to WhatsApp
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
