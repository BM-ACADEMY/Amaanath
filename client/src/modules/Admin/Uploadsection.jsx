import React, { useState, useEffect } from "react";
import axios from "axios";
import {FaPlus, FaSpinner, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosCloudUpload } from "react-icons/io";

const RealEstateForm = () => {
  const [mainHeadings, setMainHeadings] = useState([]);
  const [subHeadings, setSubHeadings] = useState([]);
  const [contents, setContents] = useState([]);
  const [mainHeading, setMainHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [codeName, setCodeName] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [attributes, setAttributes] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainRes, subRes, contentsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/main-headings`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/sub-headings`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/contents`),
        ]);
        setMainHeadings(mainRes.data);
        setSubHeadings(subRes.data);
        setContents(contentsRes.data);
      } catch (err) {
        setError("Failed to fetch data");
        toast.error("Failed to fetch data",err);
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      toast.warn("Some files were too large (max 5MB).");
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

  try {
    const formData = new FormData();
    formData.append("main_heading", mainHeading);
    formData.append("sub_heading", subHeading);
    formData.append("code_name", codeName);
    formData.append("description", attributes.join(","));

    // IMPORTANT: send the remaining existing images (URLs/paths) so backend can persist them
    if (editingId) {
      formData.append("existing_images", JSON.stringify(existingImages));
    }

    // append any newly uploaded files
    images.forEach((image) => formData.append("images", image));

    let response;
    if (editingId) {
      response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/contents/${editingId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Content updated successfully");
    } else {
      response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/contents`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Content submitted successfully");
    }

    const contentsRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/contents`);
    setContents(contentsRes.data);
    resetForm();
  } catch (err) {
    const errMsg = err.response?.data?.error || "Failed to submit/update";
    setError(errMsg);
    toast.error(errMsg);
  } finally {
    setLoading(false);
  }
};


  const handleEdit = (content) => {
    setMainHeading(content.main_heading._id);
    setSubHeading(content.sub_heading._id);
    setCodeName(content.code_name);
    setAttributes(content.description || [""]);
    setImages([]);
    setExistingImages(content.images || []);
    setEditingId(content._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/contents/${id}`);
      toast.success("Content deleted successfully");
      const contentsRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/contents`);
      setContents(contentsRes.data);
    } catch (err) {
      toast.error("Failed to delete content",err);
    }
  };

  const resetForm = () => {
    setMainHeading("");
    setSubHeading("");
    setCodeName("");
    setImages([]);
    setExistingImages([]);
    setAttributes([""]);
    setEditingId(null);
  };

  const [filterMain, setFilterMain] = useState("");
const [filterSub, setFilterSub] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

// Filtering
const filteredContents = contents.filter((c) => {
  const matchMain = filterMain ? c.main_heading?._id === filterMain : true;
  const matchSub = filterSub ? c.sub_heading?._id === filterSub : true;
  return matchMain && matchSub;
});

// Pagination
const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedData = filteredContents.slice(startIndex, startIndex + itemsPerPage);


  return (
    <div className="mt-18 flex flex-col items-center min-h-screen bg-gradient-to-br from-[#f7f7f7] via-[#fdf5e6] to-[#fef2f2] p-6 md:p-10 space-y-10">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Form Card */}
      <form
  onSubmit={handleSubmit}
  className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl border-1 border-gray-500 space-y-8"
>
  <h2 className="text-3xl font-extrabold text-blue-700 text-center">
    {editingId ? "Edit Properties" : " Add New Properties"}
  </h2>
  {error && <p className="text-red-500 text-center">{error}</p>}

  {/* Section 1: Headings */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
      Basic Details
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
        <p className="text-xs text-gray-500 mt-1">Choose the main category</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
        <p className="text-xs text-gray-500 mt-1">Choose the sub category</p>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
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
      <p className="text-xs text-gray-500 mt-1">Unique identifier for Properties</p>
    </div>
  </div>

  {/* Section 2: Images */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
      Images
    </h3>
    <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-blue-50 transition-colors">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <IoIosCloudUpload className="text-4xl text-blue-500 mx-auto mb-2" />
        <span className="text-gray-600">
          Drag & drop or click to upload (Max 5MB each)
        </span>
      </label>
    </div>

    {/* Preview with remove option */}
<div className="mt-4 flex flex-wrap gap-3">
  {/* Existing Images */}
  {existingImages.map((url, i) => (
    <div
      key={`existing-${i}`}
      className="relative group w-24 h-24 rounded-lg overflow-hidden border shadow-md"
    >
      <img
        src={url}
        alt="existing"
        className="w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={() =>
          setExistingImages(existingImages.filter((_, index) => index !== i))
        }
        className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1 opacity-0 group-hover:opacity-100"
      >
        ✕
      </button>
    </div>
  ))}

  {/* Newly Uploaded Images */}
  {images.map((file, i) => (
    <div
      key={i}
      className="relative group w-24 h-24 rounded-lg overflow-hidden border shadow-md"
    >
      <img
        src={URL.createObjectURL(file)}
        alt="preview"
        className="w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={() => setImages(images.filter((_, index) => index !== i))}
        className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1 opacity-0 group-hover:opacity-100"
      >
        ✕
      </button>
    </div>
  ))}
</div>

  </div>

  {/* Section 3: Attributes */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
     Description
    </h3>
    {attributes.map((attr, i) => (
      <div
        key={i}
        className="flex items-center gap-2 mb-2 border rounded-lg p-2"
      >
        <input
          type="text"
          value={attr}
          onChange={(e) => handleAttributeChange(i, e.target.value)}
          placeholder={`Description ${i + 1}`}
          className="flex-1 border-none focus:ring-0 outline-none"
        />
      </div>
    ))}
    <button
      type="button"
      onClick={addAttribute}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-2"
    >
      <FaPlus /> Add More
    </button>
  </div>

  {/* Section 4: Submit */}
  <div className="space-y-2">
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center transition shadow-md"
    >
      {loading ? (
        <FaSpinner className="animate-spin mr-2" />
      ) : editingId ? (
        "Update Properties"
      ) : (
        "Submit Properties"
      )}
    </button>
    {editingId && (
      <button
        type="button"
        onClick={resetForm}
        className="w-full border border-gray-400 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
      >
        Cancel Edit
      </button>
    )}
  </div>
</form>


    {/* Contents Table */}
<div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
  <h3 className="text-xl font-bold mb-6 text-gray-800">All Properties</h3>

  {/* Filters */}
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <select
      value={filterMain}
      onChange={(e) => setFilterMain(e.target.value)}
      className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
    >
      <option value="">Filter by Main Heading</option>
      {mainHeadings.map((h) => (
        <option key={h._id} value={h._id}>
          {h.name}
        </option>
      ))}
    </select>

    <select
      value={filterSub}
      onChange={(e) => setFilterSub(e.target.value)}
      className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
    >
      <option value="">Filter by Sub Heading</option>
      {subHeadings.map((h) => (
        <option key={h._id} value={h._id}>
          {h.name}
        </option>
      ))}
    </select>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="p-3 text-left">Main Heading</th>
          <th className="p-3 text-left">Sub Heading</th>
          <th className="p-3 text-left">Code Name</th>
          {/* <th className="p-3 text-left">Attributes</th> */}
          <th className="p-3 text-left">Images</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.length > 0 ? (
          paginatedData.map((content) => (
            <tr
              key={content._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">{content.main_heading?.name}</td>
              <td className="p-3">{content.sub_heading?.name}</td>
              <td className="p-3 font-semibold">{content.code_name}</td>
              {/* <td className="p-3">
                <ul className="list-disc ml-5 space-y-1">
                  {content.description?.map((attr, i) => (
                    <li key={i}>{attr}</li>
                  ))}
                </ul>
              </td> */}
              <td className="p-3">
                <div className="flex gap-2 flex-wrap">
                  {content.images?.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="image"
                      className="w-12 h-12 object-cover rounded-md border shadow-sm"
                    />
                  ))}
                </div>
              </td>
              <td className="p-3 flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(content)}
                  className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(content._id)}
                  className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="6"
              className="text-center text-gray-500 py-6 italic"
            >
              No Properties found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
    <span>
      Page {currentPage} of {Math.ceil(filteredContents.length / itemsPerPage)}
    </span>
    <div className="flex gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <button
        disabled={currentPage === Math.ceil(filteredContents.length / itemsPerPage)}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default RealEstateForm;
