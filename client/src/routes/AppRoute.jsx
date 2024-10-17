import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeUser from "../components/HomeUser";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Product from "../pages/Product";
import AdminLayout from "../layout/AdminLayout";
import ManageUser from "../pages/admin/ManageUser";
import AdminProduct from "../pages/admin/AdminProduct";
import Category from "../pages/admin/Category";
import Order from "../pages/admin/Order";
import Unauthorized from "../pages/Unauthorized";
import PageNotFound from "../pages/PageNotFound";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import UserInfo from "../components/UserInfo";
import PrivateRoute from "./PrivateRoute";
import UserAddress from "../components/UserAddress";
import Cart from "../pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "login", element: <Login /> },
      { path: "product", element: <Product /> },
      {
        path: "user/info",
        element: (
          <PrivateRoute>
            <UserInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "user/address",
        element: (
          <PrivateRoute>
            <UserAddress />
          </PrivateRoute>
        ),
      },
      { path: "cart", element: <Cart /> },
      { path: "unauthorize", element: <Unauthorized /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <ManageUser /> },
      { path: "product", element: <AdminProduct /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "editproduct", element: <EditProduct /> },
      { path: "category", element: <Category /> },
      { path: "order", element: <Order /> },
    ],
  },
]);

const AppRoute = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoute;
