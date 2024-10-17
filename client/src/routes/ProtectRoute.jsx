import React, { useEffect, useState } from "react";
import useAuthStore from "../store/auth-store";
import { currentUser } from "../api/auth";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ element, allow }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = async () => {
    try {
      const resp = await currentUser(token);
      //   console.log(resp);
      const role = resp.data.member.role;
      //   console.log("role from backend", role);
      if (allow.includes(role)) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    } catch (error) {
      console.log(error);
      setIsAllowed(false);
    }
  };

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }
  if (!isAllowed) {
    return <Navigate to={"/unauthorize"} />;
  }

  return element;
};

export default ProtectRoute;
