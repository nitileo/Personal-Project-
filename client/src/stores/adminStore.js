import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAdminStore = create(
  persist((set, get) => ({}), {
    name: "state",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useAdminStore;
