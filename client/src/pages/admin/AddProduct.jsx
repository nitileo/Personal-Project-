import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    amount: "",
    author: "",
    publisher: "",
    publishDate: "",
    categoryId: "",
    image: null,
    previewImage: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
      previewImage: null,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Resize/compress the image
      Resizer.imageFileResizer(
        file,
        300, // max width
        300, // max height
        "JPEG", // output format (JPEG/PNG)
        80, // quality (0 to 100)
        0, // rotation
        (data) => {
          // `uri` is the Base64 encoded string of the compressed image
          setFormData({
            ...formData,
            image: data, // Save the resized image
            previewImage: URL.createObjectURL(file),
          });
        },
        "base64" // Output type
      );
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Handle form submission logic here
      const newProduct = await axios.post(
        "http://localhost:8080/admin/product",
        formData
      );
      // console.log(formData);
      console.log(newProduct);
      setFormData({
        title: "",
        description: "",
        price: "",
        amount: "",
        author: "",
        publisher: "",
        publishDate: "",
        categoryId: "",
        image: null,
        previewImage: null,
      });
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto bg-gray-100 p-6 rounded-lg shadow-md w-4/5"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount:
          </label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Author:
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Publisher:
          </label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Published Date:
          </label>
          <input
            type="month"
            name="publishDate"
            max="2024-12"
            value={formData.publishDate}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Your Picture:
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {formData.previewImage && (
          <div className="mb-4 relative inline-block">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image Preview:
            </label>
            {/* Container for the image */}
            <div className="relative flex flex-col items-center gap-2">
              <img
                src={formData.previewImage}
                alt="Selected"
                className="rounded-lg shadow-md max-w-xs"
              />
              {/* Remove Button */}
              <button
                type="button"
                onClick={handleRemoveImage}
                className=" bg-red-500 text-white rounded-lg p-3 text-md hover:bg-red-700 focus:outline-none"
              >
                Remove Image
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
