import React from "react";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <HeaderAdmin />
      <div className="flex">
        <div className="w-[15%] h-auto min-h-screen bg-[#666666]">
          <SidebarAdmin />
        </div>
        <div className="w-[85%] h-auto min-h-screen bg-orange-300 flex p-10 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
