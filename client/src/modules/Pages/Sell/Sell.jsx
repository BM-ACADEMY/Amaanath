import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";

export const Sell = () => {
  const [selected, setSelected] = useState(null);
  const [contents, setContents] = useState([]);
  const [subHeadings, setSubHeadings] = useState([]);
  const navigate = useNavigate();

  // Fetch SubHeadings and Contents
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch SubHeadings
        const subRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/sub-headings`
        );
        const fetchedSubHeadings = subRes.data;
        setSubHeadings(fetchedSubHeadings);

        if (fetchedSubHeadings.length > 0) {
          setSelected(fetchedSubHeadings[0].name);
        }

        // Fetch Contents and filter by main_heading.name === "Sell"
        const contentRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/contents`
        );
        const sellContents = contentRes.data.filter(
          (content) => content.main_heading.name === "Sell"
        );
        setContents(sellContents);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Filter contents based on selected sub-heading
  const filteredContents = contents.filter(
    (content) => content.sub_heading.name === selected
  );

  return (
    <div className="min-h-screen flex flex-col items-center px-6 bg-gradient-to-br from-[#f7f7f7] via-[#fdf5e6] to-[#fef2f2]">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold font-quicksand text-gray-900 pt-32 mb-10 text-center">
        List Your <span className="text-[#b68d10]">Properties to Sell</span>
      </h1>

      {/* Subheading Buttons */}
      <div className="flex gap-3 mb-12 flex-wrap justify-center">
        {subHeadings.map((sub) => (
          <button
            key={sub._id}
            onClick={() => setSelected(sub.name)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border backdrop-blur-sm ${
              selected === sub.name
                ? "bg-[#b68d10] text-white border-[#b68d10] shadow-lg"
                : "bg-white/70 text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Display Section */}
      {selected && (
        <div className="w-full max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContents.length > 0 ? (
            filteredContents.map((content) => (
              <div
                key={content._id}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200"
                onClick={() => navigate(`/sell/${content.code_name}`)}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-60">
                  <img
                    src={content.images[0]}
                    alt={content.code_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Code Name */}
                  <div className="mb-3">
                    <span className="text-xs uppercase tracking-wide text-gray-500">
                      Property Code
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">
                      {content.code_name}
                    </h3>
                  </div>

                  {/* Description */}
                  {/* <p className="text-sm text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                    {content.description || "List your property for sale"}
                  </p> */}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto border-t pt-4">
                    <button className="flex items-center gap-2 text-sm font-medium text-[#b68d10] hover:text-[#8c6e0d] transition-colors">
                      View Details
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 w-full text-center py-8">
              No properties found for <b>{selected}</b>.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
