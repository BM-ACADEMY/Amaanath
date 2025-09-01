import React, { useState } from "react";
import bgImage from "../../assets/img/enquiry.png"; // <-- replace with your image path

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "",
    freeTime: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `📋 New Real Estate Enquiry:
    
Name: ${formData.name}
Phone: ${formData.phone}
Property Type: ${formData.propertyType}
Free Time: ${formData.freeTime}
Message: ${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = "919600815824"; // change to your WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

    setFormData({
      name: "",
      phone: "",
      propertyType: "",
      freeTime: "",
      message: "",
    });
  };

  return (
    <div
      className="relative min-h-screen flex flex-col lg:flex-row bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full">
        {/* Left Side Text */}
        <div className="hidden md:flex md:w-full lg:w-1/2 items-center justify-center p-8">
          <h1 className="text-3xl md:text-4xl lg:text-7xl font-quicksand font-extrabold text-center text-white drop-shadow-lg leading-snug">
            Find Your Dream <br /> Property With Us
          </h1>
        </div>

        {/* Right Side Form Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
          {/* Heading (shown above form in sm only) */}
          <h2 className="block md:hidden text-2xl font-semibold font-quicksand mb-6 text-center mt-22 text-white">
            Real Estate Enquiry Form
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-6 w-full max-w-lg"
          >
            {/* Heading (only visible md+ above form) */}
            <h2 className="hidden md:block font-quicksand text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-900">
              Real Estate Enquiry Form
            </h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your Phone"
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Property Type */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Property Type</label>
              <input
                type="text"
                name="propertyType"
                placeholder="e.g. Apartment, Villa, Plot..."
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Free Time */}
            <div className="mb-4">
  <label className="block text-gray-700 font-medium mb-1">
    Free Time for Call
  </label>
  <input
    type="time"
    name="freeTime"
    value={formData.freeTime}
    onChange={handleChange}
    required
    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
  />
</div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                placeholder="Message..."
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white font-semibold py-2 rounded-lg hover:bg-yellow-700 transition shadow-md"
            >
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
