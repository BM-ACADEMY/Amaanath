import React, { useState } from "react";

export const Buy = () => {
  const [selected, setSelected] = useState(null);

  const data = {
    commercial: {
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800",
      code: "C-INV-2025",
      address: "123 Business Park, Downtown, Mumbai",
    },
    residential: {
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
      code: "RES-2025",
      address: "456 Green Valley, Bandra, Mumbai",
    },
  };

  return (
    <div className="bg-red-50 min-h-screen flex flex-col items-center">
      {/* Buttons with top margin */}
      <div className="flex gap-4 mb-6 mt-24">
        <button
          onClick={() => setSelected("commercial")}
          className={`px-6 py-3 rounded-md font-semibold ${
            selected === "commercial"
              ? "bg-black text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Commercial & Investment
        </button>
        <button
          onClick={() => setSelected("residential")}
          className={`px-6 py-3 rounded-md font-semibold ${
            selected === "residential"
              ? "bg-black text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Residential
        </button>
      </div>

      {/* Display Section */}
      {selected && (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 text-center">
          <img
            src={data[selected].image}
            alt={selected}
            className="rounded-lg w-full h-48 object-cover mb-4"
          />
          <h3 className="text-lg font-bold">{data[selected].code}</h3>
          <p className="text-gray-600">{data[selected].address}</p>
        </div>
      )}
    </div>
  );
};
