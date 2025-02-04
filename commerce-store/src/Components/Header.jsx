import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Modal, Button, Result } from "antd";

const Header = ({ product }) => {
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showCart, setCart, setShowCart, cartItems, removeFromCart } =
    useCart();

  const handleCartClick = () => {
    navigate("/checkout");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const OrderConfirmation = () => {
    <Modal
      open={showConfirmation}
      onCancel={() => setShowConfirmation(false)}
      footer={[
        <Button
          key="continue"
          type="success"
          onClick={() => {
            setShowConfirmation(false);
            setCart([]); //clear cart
          }}
        >
          Continue Shopping
        </Button>
      ]}
      centered
      maskClosable={false}
    >
      <Result
        status="success"
        title="Order Confirmed!"
        subTitle={
          <span className="text-gray-600">
            Thank you for your purchase. You will receive a confirmation shortly
          </span>
        }
      />
    </Modal>;
  };

  return (
    <div className="w-full p-3 sm:p-4 border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/home"
              className="text-emerald-700 text-xl sm:text-2xl font-bold"
            >
              Commerce
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
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
            <div className="flex justify-between items-center">
              <button
                onClick={handleCartClick}
                className="relative cursor-pointer"
              >
                <ShoppingCart className="text-emerald-700" size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    Cart ({cartItems.length})
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
              <button className="cursor-pointer">
                <Bell className="text-emerald-700" size={24} />
              </button>
            </div>
          </div>
        )}

        <OrderConfirmation />
      </div>
    </div>
  );
};

export default Header;
