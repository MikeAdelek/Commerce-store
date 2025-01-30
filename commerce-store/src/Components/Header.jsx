import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  MicIcon,
  Menu,
  X,
  Bell
} from "lucide-react";
import { useCart } from "../utils/CartContext";

const Header = ({ product }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showCart, setShowCart, cartItems, removeFromCart } = useCart();

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full p-3 sm:p-4 border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-emerald-700 text-xl sm:text-2xl font-bold"
            >
              Commerce
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-emerald-700"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} className="text-black items-center" />
              )}
            </button>
          </div>

          {/* Search bar - Hidden on mobile, visible on md and up */}
          <div className="hidden md:flex flex-1 justify-center mx-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="I'm shopping for...."
                className="w-full py-2 border border-emerald-700 rounded-full pl-10 pr-10"
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

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleCartClick}
                className="relative cursor-pointer"
              >
                <ShoppingCart className="text-emerald-700" size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button className="cursor-pointer">
                <Heart className="text-emerald-700" size={24} />
              </button>
              <button className="cursor-pointer">
                <Bell className="text-emerald-700" size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="I'm shopping for...."
                className="w-full py-2 border border-emerald-700 rounded-full pl-10 pr-10"
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

            {/* Mobile Icons */}
            <div className="flex justify-between">
              <button
                onClick={handleCartClick}
                className="relative cursor-pointer"
              >
                <ShoppingCart className="text-emerald-700" size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={handleCartClick}
                className="cursor-pointer flex items-center space-x-2"
              >
                <Heart className="text-emerald-700" size={24} />
                <span className="text-black">Wishlist</span>
              </button>
              <button onClick={handleCartClick} className="cursor-pointer">
                <Bell className="text-emerald-700" size={24} />
              </button>
            </div>
          </div>
        )}
        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 z-50">
            <div className="absolute right-0 top-0 h-96 bg-white shadow-xl">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Shopping Cart</h2>
                  <button onClick={handleCartClick} className="">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Cart Items */}
                <ul className="mt-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex justify-between">
                        <p className="font-medium">{item.name}</p>
                        <span>
                          ${item.price * (item.quantity || 1).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => addToCart(item.id, item.price, 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          +
                        </button>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          min="1"
                          onChange={(e) =>
                            updateQuantity(item.id, e.target.value)
                          }
                          className="w-8 text-gray-500"
                        />
                        <button
                          onClick={() => addToCart(item.id, item.price, -1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          -
                        </button>
                      </div>
                    </li>
                  ))}
                  <div className="flex justify-end mt-4">
                    <Link
                      to={`/checkout/${product.id}`}
                      className="text-white bg-[#4A4539] px-4 py-2 rounded-md hover:bg-[#33322E]"
                    >
                      Checkout
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
