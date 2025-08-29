import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        setSubHeadings(subRes.data);

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
    <div className="bg-red-50 min-h-screen flex flex-col items-center">
      {/* Buttons with top margin */}
      <div className="flex gap-4 mb-6 mt-24">
        {subHeadings.map((sub) => (
          <button
            key={sub._id}
            onClick={() => setSelected(sub.name)}
            className={`px-6 py-3 rounded-md font-semibold ${
              selected === sub.name
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Display Section */}
      {selected && (
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredContents.length > 0 ? (
            filteredContents.map((content) => (
              <div
                key={content._id}
                className="text-center cursor-pointer"
                onClick={() => navigate(`/sell/${content.code_name}`)}
              >
                <img
                  src={content.images[0]}
                  alt={content.code_name}
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-bold">{content.code_name}</h3>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No properties found for {selected}.
            </p>
          )}
        </div>
      )}
    </div>
  );
};