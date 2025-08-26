import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 */}
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
            <h3 className="font-semibold text-lg mt-2">Landiox</h3>
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

        {/* Column 2 */}
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
            <h3 className="font-semibold text-lg mt-2">Services</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>&gt; About Us</li>
            <li>&gt; Faq</li>
            <li>&gt; Our Team</li>
            <li>&gt; Blog Insights</li>
            <li>&gt; Contact</li>
          </ul>
        </div>

        {/* Column 3 (Social Links instead of Newsletter) */}
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

  
  {/* Social Icons in column */}
  <div className="flex flex-col gap-3 text-sm mt-4">
    <a href="#" className="hover:text-[#f0b100] flex items-center gap-2">
      <FaFacebookF /> Facebook
    </a>
    <a href="#" className="hover:text-[#f0b100] flex items-center gap-2">
      <FaTwitter /> Twitter
    </a>
    <a href="#" className="hover:text-[#f0b100] flex items-center gap-2">
      <FaPinterestP /> Pinterest
    </a>
    <a href="#" className="hover:text-[#f0b100] flex items-center gap-2">
      <FaInstagram /> Instagram
    </a>
    <a href="#" className="hover:text-[#f0b100] flex items-center gap-2">
      <FaYoutube /> YouTube
    </a>
  </div>
</div>


        {/* Column 4 */}
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
            <h3 className="font-semibold text-lg">Instagram Feed</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1332&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1332&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1332&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1332&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1332&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1332&auto=format&fit=crop",
            ].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="feed"
                className="w-20 h-20 object-cover rounded-sm"
              />
            ))}
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
    </a>. All rights reserved.
  </p>
</div>

    </footer>
  );
};

export default Footer;
