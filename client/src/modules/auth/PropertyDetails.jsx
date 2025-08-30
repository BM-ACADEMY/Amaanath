import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export const PropertyDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const lightGalleryRef = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/contents/code/${id}`
        );
        setContent(response.data);
      } catch (err) {
        setError("Failed to fetch property details: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [id]);

  const isBuy = location.pathname.startsWith("/buy");
  const section = isBuy ? "Buy" : "Sell";

  const shareToWhatsApp = () => {
    if (!content) return;

    const phoneNumber = "9952787198";
    const message = `
Property Details (${section}):
Code Name: ${content.code_name}
Main Heading: ${content.main_heading.name}
Sub Heading: ${content.sub_heading.name}
Description:
${content.description.map((desc) => `- ${desc}`).join("\n")}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const phoneNumber = "+91 98765 43210";

  const handleImageClick = (index) => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(index);
    } else {
      console.warn("LightGallery is not initialized yet.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-xl mb-2">Error</div>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );

  if (!content)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">Property not found</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen mt-22 bg-gradient-to-br from-[#f7f7f7] via-[#fdf5e6] to-[#fef2f2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#fefefe] to-[#f7f7f7] border border-gray-200 rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col  md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-quicksand font-extrabold text-gray-900 tracking-tight">
                {content.main_heading.name}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {content.sub_heading.name}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-[#d6b24f50] px-5 py-3 rounded-lg border border-[#d6b24f] text-center">
                <span className="text-xs uppercase tracking-wide text-gray-700 block">
                  Property Code
                </span>
                <span className="text-lg font-semibold text-blue-900">
                  {content.code_name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Images</h2>
          
          {content.images && content.images.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {content.images.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    className="relative block overflow-hidden rounded-lg cursor-pointer group hover:shadow-lg transition-shadow duration-300"
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="aspect-w-16 aspect-h-12">
                      <img
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-80"
                      />
                      {index === 2 && content.images.length > 3 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">
                            +{content.images.length - 3} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <LightGallery
                ref={lightGalleryRef}
                onInit={(detail) => {
                  lightGalleryRef.current = detail.instance;
                }}
                elementClassNames="hidden"
                speed={500}
                plugins={[lgThumbnail]}
              >
                {content.images.map((image, index) => (
                  <a
                    key={index}
                    href={image}
                    className="block overflow-hidden rounded-lg cursor-pointer group"
                    data-sub-html={`<h4>Image ${index + 1}</h4><p>${content.main_heading.name}</p>`}
                  >
                    <img
                      src={image}
                      alt={`Property image ${index + 1}`}
                      className="object-cover w-full h-64"
                    />
                  </a>
                ))}
              </LightGallery>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-100 rounded-lg">
              <svg className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-gray-500">No images available for this property</p>
            </div>
          )}
        </div>
        {/* Property Details */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-bold font-quicksand text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
            Property Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="h-6 w-6 text-blue-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Overview
              </h3>
              <dl className="space-y-4">
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-gray-600">
                    Main Category
                  </dt>
                  <dd className="mt-1 text-base text-gray-900 font-medium">
                    {content.main_heading.name}
                  </dd>
                </div>

                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-gray-600">
                    Sub Category
                  </dt>
                  <dd className="mt-1 text-base text-gray-900 font-medium">
                    {content.sub_heading.name}
                  </dd>
                </div>

                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-gray-600">
                    Property Code
                  </dt>
                  <dd className="mt-1 text-base text-gray-900 font-medium">
                    {content.code_name}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="h-6 w-6 text-blue-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                Details
              </h3>
              <ul className="space-y-3">
                {content.description.map((desc, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-gray-700 text-base leading-relaxed">
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Button */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={shareToWhatsApp}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FaWhatsapp className="h-5 w-5 mr-2" />
              Contact via WhatsApp
            </button>

            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              <FaPhoneAlt className="h-5 w-5 mr-2" />
              {phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
