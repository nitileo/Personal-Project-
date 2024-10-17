import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import validateRegister from "../utils/validate";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
};

const Register = () => {
  const actionRegister = useUserStore((state) => state.actionRegister);
  const [formError, setFormError] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const hdlChange = (e) => {
    setForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const inputError = validateRegister(form);
      if (inputError) {
        return setFormError(inputError);
      }
      await actionRegister(form);
      setForm(initialState);
      setFormError({});
      toast.success("Register Success");
      e.target.closest("dialog").close();
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      // console.log(err);
      toast.error(errMsg);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3 p-4 pt-10" onSubmit={hdlSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Firstname"
            className="input input-bordered w-full"
            name="firstName"
            value={form.firstName}
            onChange={hdlChange}
          />
          {formError.firstName && (
            <p className="text-red-500 text-xs">{formError.firstName}</p>
          )}
          <input
            type="text"
            placeholder="Lastname"
            className="input input-bordered w-full"
            name="lastName"
            value={form.lastName}
            onChange={hdlChange}
          />
          {formError.lastName && (
            <p className="text-red-500 text-xs">{formError.lastName}</p>
          )}
        </div>
        <input
          type="text"
          placeholder="email"
          className="input input-bordered w-full"
          name="email"
          value={form.email}
          onChange={hdlChange}
        />
        {formError.email && (
          <p className="text-red-500 text-xs">{formError.email}</p>
        )}
        <input
          type="text"
          placeholder="phone number"
          className="input input-bordered w-full"
          name="phone"
          value={form.phone}
          onChange={hdlChange}
        />
        {formError.phone && (
          <p className="text-red-500 text-xs">{formError.phone}</p>
        )}
        <input
          type="password"
          placeholder="New password"
          className="input input-bordered w-full"
          name="password"
          value={form.password}
          onChange={hdlChange}
        />
        {formError.password && (
          <p className="text-red-500 text-xs">{formError.password}</p>
        )}
        <input
          type="password"
          placeholder="Confirm password"
          className="input input-bordered w-full"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={hdlChange}
        />
        {formError.confirmPassword && (
          <p className="text-red-500 text-xs">{formError.confirmPassword}</p>
        )}
        <button className="btn bg-blue-500 text-xl text-white">Sign up</button>
      </form>
    </>
  );
};

export default Register;
