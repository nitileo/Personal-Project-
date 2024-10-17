import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/admin/product");
      console.log(resp.data);
      setProduct(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-auto pt-[64px] flex">
      <div className="w-[15%] h-auto bg-red-400"></div>
      <div className="w-[85%] h-auto bg-slate-200 py-10 px-[72px]">
        <h1 className="text-4xl font-bold mb-10">New Release</h1>
        <div className="flex gap-8 flex-wrap justify-start ml-10">
          {product.map((el, index) => (
            <ProductCard el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
