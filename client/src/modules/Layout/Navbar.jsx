
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/img/logo.png";
import { RxDashboard } from "react-icons/rx";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isRightOffcanvasOpen, setIsRightOffcanvasOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainNavLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    {
      name: "Services",
      href: "#services",
      dropdown: [
        { name: "Buy", path: "/buy" },
        { name: "Sell", path: "/sell" },
        { name: "Business Deal", path: "/business-deal" },
      ],
    },
    { name: "Why Choose", href: "#whychoose" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const navigateTo = (e, name, href) => {
    e.preventDefault();
    setActiveLink(name);
    setIsOffcanvasOpen(false);
    setIsRightOffcanvasOpen(false);

    if (href && href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: href } });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href); // update hash in URL
        }
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled ? "bg-[#111111] shadow-lg py-3" : "bg-[#111111] py-1"
        }`}
      >
        <div className="px-4 md:px-8 lg:px-16 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4 justify-start">
            <div className="w-24 h-20 flex items-center justify-center text-gray-700 font-bold">
              <Link to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
            <div className="hidden lg:block h-20 border-l border-[#d3d0c656]"></div>
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden lg:flex items-center space-x-8 relative"
            ref={dropdownRef}
          >
            {mainNavLinks.map((item) => (
              <div key={item.name} className="relative">
                {!item.dropdown ? (
                  <button
                    onClick={(e) => navigateTo(e, item.name, item.href)}
                    className={`text-base font-semibold transition-colors duration-200 ${
                      activeLink === item.name
                        ? "text-[#ce9e0e]"
                        : "text-gray-200 hover:text-[#b68d10]"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        )
                      }
                      className={`text-base font-semibold transition-colors duration-200 ${
                        activeLink === item.name
                          ? "text-[#ce9e0e]"
                          : "text-gray-200 hover:text-[#b68d10]"
                      }`}
                    >
                      {item.name}
                    </button>

                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-black shadow-lg rounded-md py-2 z-50">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            to={dropItem.path}
                            className="block px-4 py-2 text-gray-200 hover:text-[#b68d10] hover:bg-[#111111]"
                            onClick={() => {
                              setActiveLink(item.name);
                              setOpenDropdown(null);
                            }}
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Right-side content */}
          <div className="flex items-center space-x-4">
            <Link
              to="/make-schedule"
              className="hidden lg:flex items-center justify-center space-x-2 bg-[#b68d10] text-white px-6 py-3 rounded-xl font-semibold transition duration-200 hover:bg-white hover:text-black"
            >
              <span>Make An Schedule</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
            </Link>

            <div className="hidden lg:block h-20 border-l border-[#d3d0c656]"></div>

            {/* Dashboard */}
            <div className="hidden lg:block">
              <button
                onClick={() => setIsRightOffcanvasOpen(true)}
                className="text-white hover:text-[#b68d10] focus:outline-none"
              >
                <RxDashboard color="white" size={35} />
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOffcanvasOpen(true)}
                className="text-white hover:text-[#b68d10] focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas */}
      <AnimatePresence>
        {isOffcanvasOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-white/80 z-40 lg:hidden"
              onClick={() => setIsOffcanvasOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="fixed inset-y-0 right-0 w-64 bg-black shadow-xl p-6 z-50 lg:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-24 h-20 flex items-center justify-center">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="max-w-full max-h-full"
                  />
                </div>
                <button
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="text-gray-300 hover:text-gray-100 focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-2">
                {mainNavLinks.map((item) => (
                  <div key={item.name}>
                    {!item.dropdown ? (
                      <button
                        className={`text-lg font-semibold transition-colors duration-200 w-full text-left ${
                          activeLink === item.name
                            ? "text-[#ce9e0e]"
                            : "text-gray-200 hover:text-[#b68d10]"
                        }`}
                        onClick={(e) => navigateTo(e, item.name, item.href)}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <>
                        <button
                          className={`text-lg font-semibold transition-colors duration-200 w-full text-left ${
                            activeLink === item.name
                              ? "text-[#ce9e0e]"
                              : "text-gray-200 hover:text-[#b68d10]"
                          }`}
                          onClick={() =>
                            setMobileDropdown(
                              mobileDropdown === item.name ? null : item.name
                            )
                          }
                        >
                          {item.name}
                        </button>
                        {mobileDropdown === item.name && (
                          <div className="ml-4 mt-2 flex flex-col space-y-1">
                            {item.dropdown.map((dropItem) => (
                              <Link
                                key={dropItem.name}
                                to={dropItem.path}
                                className="text-gray-200 hover:text-[#b68d10] px-2 py-1"
                                onClick={() => setIsOffcanvasOpen(false)}
                              >
                                {dropItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}

                <div className="mt-8">
                  <Link
                    to="/make-schedule"
                    className="bg-[#b68d10] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#8e6e0d] transition duration-200 block text-center"
                  >
                    Make An Schedule
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Right Offcanvas */}
      <AnimatePresence>
        {isRightOffcanvasOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black z-40 hidden lg:block"
              onClick={() => setIsRightOffcanvasOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="fixed inset-y-0 right-0 w-[28rem] bg-black shadow-xl p-8 z-50 hidden lg:block"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="w-28 h-24 flex items-center justify-center">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="max-w-full max-h-full"
                  />
                </div>
                <button
                  onClick={() => setIsRightOffcanvasOpen(false)}
                  className="text-white hover:text-[#b68d10] focus:outline-none"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="mt-10 text-gray-300">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Us
                </h3>
                <div className="space-y-6">
                  {/* Address */}
                  <div>
                    <p className="text-lg font-semibold text-[#b68d10]">
                      Office Address
                    </p>
                    <p className="text-base">
                      No: 252, 2nd floor, MG.ROAD, KOTTAKUPPAM, Vanur, Tamil
                      Nadu 605104.
                    </p>
                  </div>

                  {/* Phone Numbers */}
                  <div>
                    <p className="text-lg font-semibold text-[#b68d10]">
                      Phone Number
                    </p>
                    <p className="text-base">
                      <a
                        href="tel:+919600815824"
                        className="hover:underline hover:text-[#b68d10] transition"
                      >
                        +91 9600815824
                      </a>
                    </p>
                    <p className="text-base">
                      <a
                        href="tel:+919677785856"
                        className="hover:underline hover:text-[#b68d10] transition"
                      >
                        +91 9677785856
                      </a>
                    </p>
                    
                  </div>

                  {/* Emails */}
                  <div>
                    <p className="text-lg font-semibold text-[#b68d10]">
                      Email Address
                    </p>
                    <p className="text-base">
                      <a
                        href="mailto:alamaanath2025@gmail.com"
                        className="hover:underline hover:text-[#b68d10] transition"
                      >
                        alamaanath2025@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
