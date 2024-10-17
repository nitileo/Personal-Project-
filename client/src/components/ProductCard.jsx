import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import useCartStore from "../stores/cartStore";

const ProductCard = (props) => {
  const { el } = props;
  const token = useUserStore((state) => state.token);
  const actionAddProductCart = useCartStore(
    (state) => state.actionAddProductCart
  );

  const handleAddToCart = async (e, id) => {
    const FormData = {
      productId: id,
    };
    const rs = await actionAddProductCart(token, FormData);
  };

  return (
    <div>
      <div className="w-[250px] h-[400px] bg-white p-5 flex flex-col items-center justify-between ">
        <div className="w-full h-[225px] bg-green-300">
          <img
            src={el.image}
            alt="Photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">{el.title}</div>
        <div>{el.price} $</div>
        <div>
          <button
            className="bg-blue-400 flex items-center justify-center rounded-md p-1"
            value={el.id}
            onClick={(e) => handleAddToCart(e, el.id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
