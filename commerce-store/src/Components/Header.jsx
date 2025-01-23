import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, MicIcon, Menu, X } from "lucide-react";

const Header = ({ product }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="text-emerald-700"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} className="text-black" />
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
          <div className="hidden md:flex items-center space-x-4">
            <Link to={`/cartpage/${product}`} className="cursor-pointer">
              <ShoppingCart className="text-emerald-700" size={24} />
            </Link>
            <Link to={`/wishlist/${product}`} className="cursor-pointer">
              <Heart className="text-emerald-700" size={24} />
            </Link>
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
              <Link
                to={`/cartpage/${product}`}
                className="cursor-pointer flex items-center space-x-2"
              >
                <ShoppingCart className="text-emerald-700" size={24} />
                <span className="text-black">Cart</span>
              </Link>
              <Link
                to={`/wishlist/${product}`}
                className="cursor-pointer flex items-center space-x-2"
              >
                <Heart className="text-emerald-700" size={24} />
                <span className="text-black">Wishlist</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
