import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      currentCart: null,
      actionGetCart: async (token) => {
        const rs = await axios.get("http://localhost:8080/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return rs.data;
      },
      actionAddProductCart: async (token, data) => {
        const rs = await axios.post("http://localhost:8080/cart", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return rs.data;
      },
      actionDeleteCart: async (token, id) => {
        const rs = await axios.delete(`http://localhost:8080/cart/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      },
      actionEditCart: async (token, id, data) => {
        const rs = await axios.patch(`http://localhost:8080/cart/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      },
    }),
    {
      name: "cart-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
