import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      actionLogin: async (input) => {
        const rs = await axios.post("http://localhost:8080/auth/login", input);
        set({ token: rs.data.token, user: rs.data.user });
        return rs.data;
      },
      actionRegister: async (input) => {
        const rs = await axios.post(
          "http://localhost:8080/auth/register",
          input
        );
        return rs.data;
      },
      actionLogout: () => {
        set({ token: "", user: null });
      },
      actionGetData: async (token) => {
        const rs = await axios.get("http://localhost:8080/user/info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return rs.data;
      },
      actionUpdateData: async (token, data) => {
        const rs = await axios.patch("http://localhost:8080/user/info", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return rs.data;
      },
      actionGetAddress: async (token) => {
        const rs = await axios.get("http://localhost:8080/user/address", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return rs.data;
      },
      actionUpdateAddress: async (token, data) => {
        const rs = await axios.put("http://localhost:8080/user/address", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return rs.data;
      },
    }),
    {
      name: "state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
