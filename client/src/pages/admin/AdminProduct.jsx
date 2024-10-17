import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProduct = () => {
  const navigate = useNavigate();
  const hdlClick = () => {
    navigate("/admin/addproduct");
  };

  const [product, setProduct] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/admin/product");
      console.log(resp.data);
      setProduct(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const hdlEdit = (el) => {
    navigate("/admin/editproduct", { state: { el } });
  };

  const hdlDelete = async (id, imageId) => {
    try {
      const resp = await axios.delete(
        `http://localhost:8080/admin/product/${id}`
      );
      // console.log(resp);
      toast.error("delete success");
      getAllProduct();
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Book List</h1>
        <button className="bg-green-400 p-2 rounded-md" onClick={hdlClick}>
          Add New Book
        </button>
      </div>
      <hr />
      <br />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white divide-y divide-gray-200 shadow-md ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                No.
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Picture
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Author
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Sold
              </th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase text-center">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {product.map((el, index) => (
              <tr key={el.id} className="odd:bg-gray-100">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <img
                    src={
                      el.image ? el.image : "https://via.placeholder.com/150"
                    }
                    alt={el.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {el.title}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {el.category.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {el.author}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {el.description.length > 50
                    ? el.description.slice(0, 50) + "..."
                    : el.description}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  ${el.price}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {el.sellAmount}
                </td>
                <td className="gap-2 px-4 py-2 flex justify-center">
                  <button
                    className="bg-blue-400 p-2 rounded-lg"
                    onClick={() => hdlEdit(el)}
                  >
                    edit
                  </button>
                  <button
                    className="bg-red-300 p-2 rounded-lg"
                    onClick={() => hdlDelete(el.id, el.imageId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProduct;
