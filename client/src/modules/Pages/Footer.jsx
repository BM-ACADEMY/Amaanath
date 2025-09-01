import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  // Same nav links used in Header
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

  // Reuse the scroll + navigate logic
  const navigateTo = (e, href) => {
    e.preventDefault();
    if (href && href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: href } });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <div className="flex flex-col items-start mb-3">
            
            <Link to="/">
                <img src={Logo} width={150} alt="Logo" />
              </Link>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Real estate is private property in the form of buildings and land.
          </p>
          <p className="flex items-center gap-2 text-sm mb-2">
            <FaEnvelope className="text-[#f0b100]" /> info@webmail.com
          </p>
          <p className="flex items-center gap-2 text-sm mb-2">
            <FaPhone className="text-[#f0b100]" /> 908 999 000 98
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className="text-[#f0b100]" /> 12/A, New Booston, NYC
          </p>
        </div>

        {/* Column 2 (Services / Navigation Links) */}
        <div>
          <div className="flex flex-col items-start mb-3">
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
            <h3 className="font-semibold text-lg mt-2">Quick Links</h3>
          </div>

          <ul className="space-y-2 text-sm text-gray-400">
            {mainNavLinks.map((item) =>
              !item.dropdown ? (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => navigateTo(e, item.href)}
                    className="hover:text-[#f0b100] transition"
                  >
                    &gt; {item.name}
                  </a>
                </li>
              ) : (
                <li key={item.name} className="space-y-1">
                  <span className="text-gray-300 font-medium">
                    &gt; {item.name}
                  </span>
                  <ul className="ml-4 space-y-1">
                    {item.dropdown.map((drop) => (
                      <li key={drop.name}>
                        <Link
                          to={drop.path}
                          className="hover:text-[#f0b100] transition"
                        >
                          - {drop.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Column 3 (Social Links) */}
        <div>
          <div className="flex flex-col items-start mb-3">
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
            <h3 className="font-semibold text-lg mt-2">Follow Us</h3>
          </div>

          <div className="flex flex-col gap-3 text-sm mt-4">
            <a
              href="https://www.facebook.com/share/1ZV36pRxUX/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#f0b100] flex items-center gap-2"
            >
              <FaFacebookF /> Facebook
            </a>
            <a
              href="https://www.instagram.com/al_amaanath?igsh=MWs5OWk0bGZnZGVyMQ=="
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#f0b100] flex items-center gap-2"
            >
              <FaInstagram /> Instagram
            </a>
            <a
              href="https://youtube.com/@alamaanath?si=d2aNGkp8o7MTeXor"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#f0b100] flex items-center gap-2"
            >
              <FaYoutube /> YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#f0b100] text-black text-sm py-4 flex justify-center items-center">
        <p>
          © {year}{" "}
          <a
            href="https://bmtechx.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            BMTechx.in
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
