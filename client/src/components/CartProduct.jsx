// import React, { useEffect, useState } from "react";
// import useCartStore from "../stores/cartStore";
// import useUserStore from "../stores/userStore";
// let isChanged = false;
// const CartProduct = (props) => {
//   const { el } = props;
//   const token = useUserStore((state) => state.token);
//   const actionDeleteCart = useCartStore((state) => state.actionDeleteCart);
//   const actionEditCart = useCartStore((state) => state.actionEditCart);

//   const [amount, setAmount] = useState(el.amount);

//   useEffect(() => {
//     const time = setTimeout(() => {
//       if (isChanged) {
//         actionEditCart(token, el.id, { amount: amount });
//         props.getAllCart();
//       }
//     }, 1000);
//     return () => {
//       clearTimeout(time);
//     };
//   }, [amount]);

//   const handleDelete = async (id) => {
//     await actionDeleteCart(token, id);
//     props.getAllCart();
//   };

//   const totalPrice = (Number(el.product.price) * amount).toFixed(2);

//   return (
//     <div className="bg-white w-full h-[120px] mx-auto flex p-4 items-center justify-around rounded-lg shadow">
//       <div className="bg-sky-500 h-full w-[72px] rounded"></div>
//       <div className="flex-1 pl-6 font-semibold">{el.product.title}</div>
//       <div className="w-[120px] text-center">{el.product.price} $</div>
//       <div className="flex items-center justify-center bg-white rounded-lg space-x-3 w-[120px]">
//         <button
//           className="bg-blue-500 text-white px-2 rounded"
//           onClick={() => {
//             isChanged = true;
//             if (amount === 1) {
//               return;
//             }
//             setAmount(amount - 1);
//           }}
//         >
//           -
//         </button>
//         <p className="w-6 text-center">{amount}</p>
//         <button
//           className="bg-blue-500 text-white px-2 rounded"
//           onClick={() => {
//             isChanged = true;
//             setAmount(amount + 1);
//           }}
//         >
//           +
//         </button>
//       </div>
//       <div className="w-[120px] text-center">{totalPrice} $</div>
//       <div className="w-[120px] text-center">
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded"
//           onClick={() => handleDelete(el.id)}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartProduct;

import React, { useEffect, useState } from "react";
import useCartStore from "../stores/cartStore";
import useUserStore from "../stores/userStore";

const CartProduct = (props) => {
  const { el, onAmountChange } = props; // Receive the callback to notify the parent
  const token = useUserStore((state) => state.token);
  const actionDeleteCart = useCartStore((state) => state.actionDeleteCart);
  const actionEditCart = useCartStore((state) => state.actionEditCart);

  const [amount, setAmount] = useState(el.amount);

  useEffect(() => {
    const time = setTimeout(() => {
      actionEditCart(token, el.id, { amount });
      onAmountChange(el.id, amount); // Notify the parent of the change
    }, 800);

    return () => {
      clearTimeout(time); // Cleanup timer
    };
  }, [amount, token, el.id, actionEditCart, onAmountChange]);

  // Handle delete operation
  const handleDelete = async (id) => {
    await actionDeleteCart(token, id);
    props.getAllCart(); // Update the cart in the parent
  };

  // Calculate total price dynamically based on product price and amount
  const totalPrice = (Number(el.product.price) * amount).toFixed(2);

  return (
    <div className="bg-white w-full h-[120px] mx-auto flex p-4 items-center justify-around rounded-lg shadow">
      <div className="bg-sky-500 h-full w-[72px] rounded"></div>
      <div className="flex-1 pl-6 font-semibold">{el.product.title}</div>
      <div className="w-[120px] text-center">{el.product.price} $</div>
      <div className="flex items-center justify-center bg-white rounded-lg space-x-3 w-[120px]">
        <button
          className="bg-blue-500 text-white px-2 rounded"
          onClick={() => {
            if (amount === 1) return; // Prevent amount going below 1
            setAmount(amount - 1);
          }}
        >
          -
        </button>
        <p className="w-6 text-center">{amount}</p>
        <button
          className="bg-blue-500 text-white px-2 rounded"
          onClick={() => {
            setAmount(amount + 1);
          }}
        >
          +
        </button>
      </div>
      <div className="w-[120px] text-center">{totalPrice} $</div>{" "}
      {/* Updated total price */}
      <div className="w-[120px] text-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleDelete(el.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
