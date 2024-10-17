// import React, { useEffect, useState } from "react";
// import CartProduct from "../components/CartProduct";
// import useUserStore from "../stores/userStore";
// import useCartStore from "../stores/cartStore";

// const Cart = () => {
//   const token = useUserStore((state) => state.token);
//   const actionGetCart = useCartStore((state) => state.actionGetCart);
//   const [cart, setCart] = useState([]);

//   const calculateTotalPrice = () => {
//     return cart.reduce((total, item) => {
//       return total + item.product.price * item.amount;
//     }, 0);
//   };

//   const totalCartPrice = calculateTotalPrice();

//   useEffect(() => {
//     getAllCart();
//   }, []);

//   const getAllCart = async () => {
//     try {
//       const rs = await actionGetCart(token);
//       console.log(rs);
//       setCart(rs);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="mt-[64px] h-[100vh] p-10 w-4/5 mx-auto flex flex-col gap-2 bg-slate-50">
//       <p className="text-3xl font-bold mb-4">Your Cart</p>
//       <div className="bg-white w-full mx-auto h-[48px] flex justify-around items-center p-1 font-semibold pr-6 shadow-sm">
//         <div className="w-[72px] text-center">สินค้า</div>
//         <div className="flex-1 text-center"></div>
//         <div className="w-[120px] text-center">ราคาต่อชิ้น</div>
//         <div className="w-[120px] text-center">จำนวนชิ้น</div>
//         <div className="w-[120px] text-center">ราคารวม</div>
//         <div className="w-[120px] text-center">แอคชั่น</div>
//       </div>
//       <hr className="border-gray-300 my-2" />
//       {cart.map((el, index) => (
//         <CartProduct el={el} key={index} getAllCart={getAllCart} />
//       ))}
//       <hr className="border-gray-300 my-2" />
//       <div className="flex justify-end text-xl font-bold">
//         Total: {totalCartPrice.toFixed(2)} $
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import useUserStore from "../stores/userStore";
import useCartStore from "../stores/cartStore";

const Cart = () => {
  const token = useUserStore((state) => state.token);
  const actionGetCart = useCartStore((state) => state.actionGetCart);

  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0); // State for total cart price

  useEffect(() => {
    getAllCart();
  }, []);

  // Function to fetch all cart items
  const getAllCart = async () => {
    try {
      const rs = await actionGetCart(token);
      setCart(rs);
      calculateTotalPrice(rs); // Calculate total cart price after fetching cart items
    } catch (err) {
      console.log(err);
    }
  };

  // Function to calculate the total price for all items in the cart
  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.amount;
    }, 0);
    setTotalCartPrice(total); // Set the total price in state
  };

  // Function to update the cart's state and recalculate the total price after any amount change
  const handleAmountChange = (productId, newAmount) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, amount: newAmount } : item
    );
    setCart(updatedCart);
    calculateTotalPrice(updatedCart); // Recalculate the total price
  };

  return (
    <div className="mt-[64px] h-[100vh] p-10 w-4/5 mx-auto flex flex-col gap-2 bg-slate-50">
      <p className="text-3xl font-bold mb-4">Your Cart</p>
      <div className="bg-white w-full mx-auto h-[48px] flex justify-around items-center p-1 font-semibold pr-6 shadow-sm">
        <div className="w-[72px] text-center">สินค้า</div>
        <div className="flex-1 text-center"></div>
        <div className="w-[120px] text-center">ราคาต่อชิ้น</div>
        <div className="w-[120px] text-center">จำนวนชิ้น</div>
        <div className="w-[120px] text-center">ราคารวม</div>
        <div className="w-[120px] text-center">แอคชั่น</div>
      </div>
      <hr className="border-gray-300 my-2" />

      {cart.map((el, index) => (
        <CartProduct
          el={el}
          key={index}
          onAmountChange={handleAmountChange} // Pass the handler to update cart and recalculate total
        />
      ))}

      <hr className="border-gray-300 my-2" />

      {/* Total cart price displayed at the bottom */}
      <div className="flex justify-end text-xl font-bold">
        Total: {totalCartPrice.toFixed(2)} $ {/* Show the total price */}
      </div>
    </div>
  );
};

export default Cart;
