import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/img/logo.png";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isRightOffcanvasOpen, setIsRightOffcanvasOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      { name: "Business Deal", path: "/business-deal" }
    ]
  },
  { name: "Why Choose", href: "#whychoose" },
  { name: "Testimonials", href: "#testimonials" },
];


  // Smooth scroll to section
 const navigateTo = (e, name, href) => {
    e.preventDefault();
    setActiveLink(name);
    setIsOffcanvasOpen(false);
    setIsRightOffcanvasOpen(false);

    if (href && href.startsWith("#")) {
      if (location.pathname !== "/") {
        // Go to home page first, then scroll
        navigate("/", { state: { scrollTo: href } });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
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
          {/* Logo Section */}
          <div className="flex items-center space-x-4 justify-start">
            <div className="w-24 h-20 flex items-center justify-center text-gray-700 font-bold">
              <Link to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
            <div className="hidden lg:block h-20 border-l border-[#d3d0c656]"></div>
          </div>

          {/* Main Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-8 relative">
  {mainNavLinks.map((item) => (
    <div 
      key={item.name} 
      className="relative"
      onMouseEnter={() => setOpenDropdown(item.name)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <a
        href={item.href}
        className={`text-base font-semibold transition-colors duration-200 ${
          activeLink === item.name
            ? "text-[#ce9e0e]"
            : "text-gray-200 hover:text-[#b68d10]"
        }`}
        onClick={(e) => navigateTo(e, item.name, item.href)}
      >
        {item.name}
      </a>

      {/* Dropdown Menu */}
      {item.dropdown && openDropdown === item.name && (
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
    </div>
  ))}
</div>


          {/* Right-side content */}
          <div className="flex items-center space-x-4">
            {/* Schedule Button */}
            <a
              href="#"
              className="hidden lg:flex items-center justify-center space-x-2 bg-[#b68d10] text-white px-6 py-3 rounded-xl font-semibold transition duration-200 hover:bg-white hover:text-black"
              onClick={(e) => navigateTo(e, "Make An Schedule", "#home")}
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
            </a>

            <div className="hidden lg:block h-20 border-l border-[#d3d0c656]"></div>

            {/* Dashboard Icon */}
            <div className="hidden lg:block">
              <button
                onClick={() => setIsRightOffcanvasOpen(true)}
                className="text-white hover:text-[#b68d10] focus:outline-none"
              >
                <RxDashboard color="white" size={35} />
              </button>
            </div>

            {/* Mobile Menu Button */}
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

      {/* Mobile Offcanvas Menu */}
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
                  <img src={Logo} alt="Logo" className="max-w-full max-h-full" />
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
    <a
      href={item.href}
      className={`text-lg font-semibold transition-colors duration-200 ${
        activeLink === item.name
          ? "text-[#ce9e0e]"
          : "text-gray-200 hover:text-[#b68d10]"
      }`}
      onClick={(e) => navigateTo(e, item.name, item.href)}
    >
      {item.name}
    </a>

    {/* Mobile Dropdown */}
    {item.dropdown && (
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
  </div>
))}


                <div className="mt-8">
                  <a
                    href="#"
                    className="bg-[#b68d10] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#8e6e0d] transition duration-200 block text-center"
                    onClick={(e) => navigateTo(e, "Support", "#home")}
                  >
                    Make An Schedule
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Right Offcanvas Menu for Desktop */}
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
                  <img src={Logo} alt="Logo" className="max-w-full max-h-full" />
                </div>
                <button
                  onClick={() => setIsRightOffcanvasOpen(false)}
                  className="text-white hover:text-[#b68d10] focus:outline-none"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Contact Information */}
              <div className="mt-10 text-gray-300">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-lg font-semibold text-[#b68d10]">Office Address</p>
                    <p className="text-base">123/A, Miranda City Likaoli Prikano, Dope</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#b68d10]">Phone Number</p>
                    <p className="text-base">+0989 7876 9865 9</p>
                    <p className="text-base">+(090) 8765 86543</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#b68d10]">Email Address</p>
                    <p className="text-base">info@example.com</p>
                    <p className="text-base">example@info.com</p>
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
