import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';

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

    const phoneNumber = "9952787198"; // Specified WhatsApp number
    const message = `
Property Details (${section}):
Code Name: ${content.code_name}
Main Heading: ${content.main_heading.name}
Sub Heading: ${content.sub_heading.name}
Description:
${content.description.map((desc) => `- ${desc}`).join("\n")}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`; // Updated to include phone number
    window.open(whatsappUrl, "_blank");
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-red-500 text-xl mb-2">Error</div>
        <p className="text-gray-700">{error}</p>
      </div>
    </div>
  );
  
  if (!content) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">Property not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-22 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isBuy ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                {section}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                {content.main_heading.name}
              </h1>
              <p className="text-gray-600 mt-1">{content.sub_heading.name}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={shareToWhatsApp}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-.719-.911-.99-.242-.272-.487-.247-.669-.247-.173 0-.347.025-.52.074-.173.099-.694.347-.94.644-.247.297-.297.644-.297 1.064 0 .42.074.867.223 1.261.149.394.936 2.033 2.273 2.852.99.606 1.737.892 2.828 1.14.396.099.694.148.991.148.297 0 .545-.099.743-.297.198-.198.396-.471.594-.719.198-.247.396-.495.545-.644.149-.149.297-.247.446-.247.149 0 .297.05.422.149.124.099.768.668.916.816.149.149.223.297.223.446 0 .149-.074.347-.223.495-.149.149-.347.223-.545.223zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.957c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11z" />
                </svg>
                Share on WhatsApp
              </button>
              
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                <span className="text-xs text-gray-500 block">Property Code</span>
                <span className="text-gray-900 font-medium">{content.code_name}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Images</h2>
          
          {content.images && content.images.length > 0 ? (
            <LightGallery
              ref={lightGalleryRef}
              elementClassNames="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
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
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={image}
                      alt={`Property image ${index + 1}`}
                      className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </a>
              ))}
            </LightGallery>
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
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Overview</h3>
              <dl className="space-y-3">
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Main Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">{content.main_heading.name}</dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Sub Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">{content.sub_heading.name}</dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Property Code</dt>
                  <dd className="mt-1 text-sm text-gray-900">{content.code_name}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
              <div className="bg-gray-50 px-4 py-4 rounded-lg">
                <ul className="space-y-2">
                  {content.description.map((desc, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};