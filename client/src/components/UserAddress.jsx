import React, { useEffect, useState } from "react";
import UserSideBar from "./UserSideBar";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";

const UserAddress = () => {
  const actionGetAddress = useUserStore((state) => state.actionGetAddress);
  const actionUpdateAddress = useUserStore(
    (state) => state.actionUpdateAddress
  );
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    getData();
  }, []);

  const [formData, setFormData] = useState({
    addressNumber: "",
    subdistrict: "",
    district: "",
    province: "",
    zipcode: "",
  });

  const getData = async () => {
    const rs = await actionGetAddress(token);
    setFormData(rs);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actionUpdateAddress(token, formData);
    toast.success("update data success");
    getData();
  };

  return (
    <div className="mt-[64px] flex">
      <UserSideBar />
      <div className="w-[85%] h-screen bg-teal-100 p-10 flex flex-col gap-3">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Address Information
        </h2>
        <form
          className="space-y-4 min-w-[450px] bg-white p-6 mx-auto rounded-md shadow-xl"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Number (บ้านเลขที่ ซอย หมู่บ้าน )
            </label>
            <input
              type="text"
              name="addressNumber"
              value={formData.addressNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subdistrict
            </label>
            <input
              type="text"
              name="subdistrict"
              value={formData.subdistrict}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Province
            </label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zipcode
            </label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddress;
