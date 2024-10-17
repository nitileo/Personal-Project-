import { Search, ShoppingCart, User, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = useUserStore((state) => state.token);
  const actionLogout = useUserStore((state) => state.actionLogout);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  const hdlLogout = () => {
    actionLogout();
    navigate("/");
  };

  return (
    <>
      <header className="h-19 w-[1536px] bg-blue-500 fixed top-0 z-10 flex justify-between shadow-lg px-8 items-center py-2">
        <div className="text-white">LOGO</div>
        <div className="flex gap-3 text-white text-xl">
          <Link to={"/"}>Home</Link>
          <Link to={"/product"}>Product</Link>
        </div>
        <div className="w-[350px]">
          <label className="input input-bordered flex items-center gap-2 text-black bg-white rounded-full">
            <input type="text" className="grow" placeholder="Search" />
            <Search color="gray" />
          </label>
        </div>
        <div className="flex gap-6 items-center">
          <Link to={"/cart"}>
            <ShoppingCart
              className="text-white hover:cursor-pointer"
              size={32}
            />
          </Link>

          {isLogin ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-blue-500 border-none hover:bg-blue-500"
              >
                <User2 size={30} color="white" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <Link to="user/info" className="text-xl">
                    UserInfo
                  </Link>
                </li>
                <li>
                  <a className="text-xl" onClick={hdlLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/login"}
              className=" text-white text-xl border-2 p-2 rounded-md hover:bg-blue-400"
            >
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
