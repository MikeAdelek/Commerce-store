// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ArrowLeft, Minus, Plus } from "lucide-react";
// import productpage1 from "../assets/productpage1.jpeg";
// import wishlist from "../assets/wishlist.jpeg";

// const CartPage = ({ product }) => {
//   const [quantity, setQuantity] = useState(1);

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <Link
//         to={`/productpage/${product}`}
//         className="flex items-center gap-2 mb-6"
//       >
//         <ArrowLeft className="text-gray-600" />
//         <h1 className="text-gray-600">Cart (1)</h1>
//       </Link>

//       {/* Cart Items */}
//       <div className="mb-8">
//         <div className="flex gap-4">
//           <img
//             src={productpage1}
//             alt="Ceramic Mug"
//             className="w-32 h-32 object-cover rounded-lg"
//           />
//           <div className="flex-1">
//             <h2 className="text-gray-700 mb-1">
//               500ml Ceramic multipurpose mug, with, 2 coffee cups
//             </h2>
//             <p className="text-sm text-gray-500 mb-2">Size: 500ml</p>
//             <div className="flex gap-2 mb-2">
//               {["green", "red", "blue"].map((color) => (
//                 <div
//                   key={color}
//                   className={`w-5 h-5 rounded-full ${
//                     color === "green"
//                       ? "bg-emerald-700"
//                       : color === "red"
//                       ? "bg-red-500"
//                       : "bg-blue-500"
//                   }`}
//                 />
//               ))}
//             </div>
//             <p className="text-sm text-orange-500">Almost Sold out</p>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mt-4">
//           <div className="bg-orange-500 text-white px-4 py-2 rounded">
//             Subtotal: ₦ {(10000 * quantity).toLocaleString()}
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               className="bg-gray-100 p-2 rounded"
//             >
//               <Minus size={16} />
//             </button>
//             <span className="w-8 text-center">{quantity}</span>
//             <button
//               onClick={() => setQuantity(quantity + 1)}
//               className="bg-emerald-700 text-white p-2 rounded"
//             >
//               <Plus size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       <Link
//         to={`/checkout/${product}`}
//         className="bg-orange-500 text-white flex justify-center p-4 rounded-lg mb-8"
//       >
//         Check Out
//       </Link>

//       {/* WishList */}
//       <div>
//         <h2 className="text-gray-600 mb-4">WishList (1)</h2>
//         <div className="flex gap-4">
//           <img
//             src={wishlist}
//             alt="Vitamin C Serum"
//             className="w-32 h-32 object-cover rounded-lg"
//           />
//           <div className="flex-1">
//             <h3 className="text-gray-700 mb-1">Moisturizing Vit C Serum</h3>
//             <p className="text-sm text-gray-500 mb-2">Dopezz</p>
//             <p className="text-sm text-gray-500 mb-2">₦ 4, 092</p>
//             <button className="bg-orange-500 text-white p-2 rounded-lg mb-8">
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
