import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";

export const Buy = () => {
  const [selected, setSelected] = useState(null);
  const [contents, setContents] = useState([]);
  const [subHeadings, setSubHeadings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/sub-headings`
        );
        const fetchedSubHeadings = subRes.data;
        setSubHeadings(fetchedSubHeadings);

        if (fetchedSubHeadings.length > 0) {
          setSelected(fetchedSubHeadings[0].name);
        }

        const contentRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/contents`
        );
        const buyContents = contentRes.data.filter(
          (content) => content.main_heading.name === "Buy"
        );
        setContents(buyContents);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const filteredContents = contents.filter(
    (content) => content.sub_heading.name === selected
  );

  return (
    <div className="min-h-screen flex flex-col items-center px-6 bg-gradient-to-br from-[#f7f7f7] via-[#fdf5e6] to-[#fef2f2]">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold font-quicksand text-gray-900 pt-32 mb-10 text-center">
        Explore <span className="text-[#b68d10]">Properties to Buy</span>
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

      {/* Cards */}
      {selected && (
        <div className="w-full max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContents.length > 0 ? (
            filteredContents.map((content) => (
              <div
                key={content._id}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:-translate-y-2"
                onClick={() => navigate(`/buy/${content.code_name}`)}
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
                <div className="p-6 flex flex-col justify-between flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                    {content.code_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {content.description || "Explore this property"}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-[#b68d10] font-semibold">
                      View Details
                    </span>
                    <ArrowRight
                      size={18}
                      className="text-[#b68d10] group-hover:translate-x-1 transition-transform"
                    />
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
