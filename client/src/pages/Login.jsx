import React, { useState } from "react";
import Register from "./register";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const login = () => {
  const actionLogin = useUserStore((state) => state.actionLogin);
  const token = useUserStore((state) => state.token);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const hdlChange = (e) => {
    setForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const roleRedirect = (role) => {
    console.log(role);
    if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const hdlClick = async (e) => {
    try {
      const role = await actionLogin(form);
      console.log("Login success");

      if (role) {
        roleRedirect(role.user.user.role);
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      toast.error(errMsg);
    }
  };
  return (
    <>
      <div className="flex h-screen pt-[64px]">
        <div className="w-[50%]">left</div>
        <div className="w-[50%] flex items-center justify-center">
          <div className="flex flex-col gap-3 px-6 w-4/5">
            <h1 className="text-center text-bold text-3xl font-bold mt-4">
              Login
            </h1>
            <label className="flex flex-col gap-1 font-bold">
              E-mail
              <input
                type="text"
                className="rounded-md p-1 shadow-md"
                placeholder="Example@email.com"
                name="email"
                value={form.email}
                onChange={hdlChange}
              />
            </label>
            <label className="flex flex-col gap-1 font-bold">
              Password
              <input
                type="text"
                className="rounded-md p-1 shadow-md"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={hdlChange}
              />
            </label>
            <button
              className="bg-blue-400 font-bold text-white p-2 rounded-lg shadow-md hover:scale-105"
              onClick={hdlClick}
            >
              Login
            </button>
            <button
              className="bg-green-300 font-bold text-white p-2 rounded-lg shadow-md hover:scale-105"
              onClick={() =>
                document.getElementById("register-modal").showModal()
              }
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <dialog id="register-modal" className="modal">
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => e.target.closest("dialog").close()}
          >
            ✕
          </button>
          <Register />
        </div>
      </dialog>
    </>
  );
};

export default login;
