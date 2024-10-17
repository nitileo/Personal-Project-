import useUserStore from "@/src/stores/userStore";
import {
  BookA,
  BookCheck,
  BookHeartIcon,
  ChartColumnStacked,
  ListOrderedIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SidebarAdmin = () => {
  const actionLogout = useUserStore((state) => state.actionLogout);
  const navigate = useNavigate();
  const hdlLogout = () => {
    actionLogout();
    navigate("/");
  };

  return (
    <div className="flex flex-col h-4/5 justify-between item-centers py-5">
      <div className="flex flex-col items-start text-xl text-white gap-6 px-7">
        <Link to={"/admin"} className="flex items-center gap-2 ">
          <SettingsIcon />
          Manage User
        </Link>
        <Link to={"/admin/product"} className="flex items-center gap-2">
          <BookHeartIcon />
          Product
        </Link>
        <Link to={"/admin/category"} className="flex items-center gap-2">
          <ChartColumnStacked />
          Category
        </Link>
        <Link to={"/admin/order"} className="flex items-center gap-2">
          <ListOrderedIcon />
          order
        </Link>
      </div>
      <Link
        className="flex justify-start items-center gap-2 text-xl text-white px-7"
        onClick={hdlLogout}
      >
        <LogOutIcon />
        Logout
      </Link>
    </div>
  );
};

export default SidebarAdmin;
