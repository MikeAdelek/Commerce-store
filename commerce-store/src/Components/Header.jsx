import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, MicIcon } from "lucide-react";
// import { products } from "./ProductDetails";
// import { useCart } from "./CartContext";
const Header = ({ product }) => {
  // const product = products.find((p) => p.id === productId || products[0]);
  // const { cartItems, addToCart } = useCart();

  return (
    <div className="w-full p-4 border-b">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1">
          <Link to="/" className="text-emerald-700 text-2xl font-bold">
            Commerce
          </Link>
        </div>
        <div className="flex flex-1 justify-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="I'm shopping for...."
              className="w-full py-2 border border-emerald-700 rounded-full pl-10"
            />
            <Search
              className="absolute left-3 top-2.5 text-emerald-700"
              size={20}
            />
            <MicIcon
              className="absolute right-3 top-2.5 text-emerald-700 cursor-pointer"
              size={20}
            />
          </div>
        </div>
        <Link
          to={`/cartpage/${product}`}
          // onClick={() => addToCart(cartpage)}
          className="flex flex-1 justify-end gap-6 cursor-pointer"
        >
          <ShoppingCart className="text-emerald-700" />
          <Heart className="text-emerald-700" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
