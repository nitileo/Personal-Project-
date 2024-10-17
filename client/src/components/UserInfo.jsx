import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";
import UserSideBar from "./UserSideBar";

const UserInfo = () => {
  const token = useUserStore((state) => state.token);
  const actionGetData = useUserStore((state) => state.actionGetData);
  const actionUpdateData = useUserStore((state) => state.actionUpdateData);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const rs = await actionGetData(token);
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
    await actionUpdateData(token, formData);
    toast.success("update data success");
    getData();
  };

  return (
    <div className="mt-[64px]">
      <div className="bg-slate-200 w-full h-screen flex">
        <UserSideBar />
        <div className="w-[85%] h-screen bg-teal-100 p-10 flex flex-col gap-3">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl mx-auto my-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              User Information
            </h2>
            <h3></h3>
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  disabled
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-red-500 ml-3">
                  ***Can't change the email.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
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
      </div>
    </div>
  );
};

export default UserInfo;
