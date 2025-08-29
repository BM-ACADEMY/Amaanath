
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload, FaPlus, FaSpinner } from "react-icons/fa";

const RealEstateForm = () => {
  const [mainHeadings, setMainHeadings] = useState([]);
  const [subHeadings, setSubHeadings] = useState([]);
  const [mainHeading, setMainHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [codeName, setCodeName] = useState("");
  const [images, setImages] = useState([]);
  const [attributes, setAttributes] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");

  // Fetch main headings and sub headings on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainRes, subRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/main-headings`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/sub-headings`),
        ]);
        setMainHeadings(mainRes.data);
        setSubHeadings(subRes.data);
      } catch (err) {
        setError("Failed to fetch headings");
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024); // 5MB limit
    if (validFiles.length !== files.length) {
      alert("Some files were too large (max 5MB).");
    }
    setImages([...images, ...validFiles]);
  };

  const handleAttributeChange = (index, value) => {
    const newAttributes = [...attributes];
    newAttributes[index] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("main_heading", mainHeading);
    formData.append("sub_heading", subHeading);
    formData.append("code_name", codeName);
    formData.append("description", attributes.join(","));
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/contents`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSubmittedData({
        mainHeading: mainHeadings.find((h) => h._id === mainHeading)?.name,
        subHeading: subHeadings.find((h) => h._id === subHeading)?.name,
        codeName,
        images,
        attributes,
      });
      // Reset form
      setMainHeading("");
      setSubHeading("");
      setCodeName("");
      setImages([]);
      setAttributes([""]);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 space-y-10">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Real Estate Form
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Main Heading */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Main Heading
          </label>
          <select
            value={mainHeading}
            onChange={(e) => setMainHeading(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">Select Main Heading</option>
            {mainHeadings.map((heading) => (
              <option key={heading._id} value={heading._id}>
                {heading.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Heading */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Sub Heading
          </label>
          <select
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">Select Sub Heading</option>
            {subHeadings.map((heading) => (
              <option key={heading._id} value={heading._id}>
                {heading.name}
              </option>
            ))}
          </select>
        </div>

        {/* Code Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Code Name
          </label>
          <input
            type="text"
            value={codeName}
            onChange={(e) => setCodeName(e.target.value)}
            placeholder="Enter Code Name"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Upload Images
          </label>
          <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FaUpload className="text-3xl text-blue-500 mx-auto mb-2" />
              <span className="text-gray-600">
                Click to upload (Max 5MB each)
              </span>
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {images.map((file, i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-lg overflow-hidden border"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Attributes */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Attributes / Description
          </label>
          {attributes.map((attr, i) => (
            <input
              key={i}
              type="text"
              value={attr}
              onChange={(e) => handleAttributeChange(i, e.target.value)}
              placeholder={`Attribute ${i + 1}`}
              className="w-full border rounded-lg p-3 mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}
          <button
            type="button"
            onClick={addAttribute}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-2"
          >
            <FaPlus /> Add Attribute
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center transition"
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {/* Submitted Data Table */}
      {submittedData && (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Submitted Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 text-left">Main Heading</th>
                  <th className="p-3 text-left">Sub Heading</th>
                  <th className="p-3 text-left">Code Name</th>
                  <th className="p-3 text-left">Attributes</th>
                  <th className="p-3 text-left">Images</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">{submittedData.mainHeading}</td>
                  <td className="p-3">{submittedData.subHeading}</td>
                  <td className="p-3">{submittedData.codeName}</td>
                  <td className="p-3">
                    <ul className="list-disc ml-5">
                      {submittedData.attributes.map((attr, i) => (
                        <li key={i}>{attr}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2 flex-wrap">
                      {submittedData.images.map((file, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateForm;