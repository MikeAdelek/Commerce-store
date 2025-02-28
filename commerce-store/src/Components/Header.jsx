import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../assets/user3.jpg";
import { Search, ShoppingCart, Menu, X, User, Mic, LogOut } from "lucide-react";
import { useCart, useAuth } from "../utils/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const profileMenuRef = useRef(null);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleUserProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    } else {
      navigate("login");
    }
  };

  const handleSignOut = () => {
    signOut();
    setIsProfileMenuOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full z-50 fixed bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="text-emerald-700 text-xl sm:text-2xl font-bold"
            >
              Commerce
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-emerald-700 p-2 rounded-md hover:bg-emerald-50 transition-colors"
              aria-label="Toggle Menu"
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Search bar - Hidden on mobile, visible on md and up */}
          <motion.div
            className="hidden md:flex flex-1 justify-center mx-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="I'm shopping for...."
                className="w-full py-2 border border-emerald-700 rounded-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              <Search
                className="absolute left-3 top-2.5 text-emerald-700"
                size={20}
              />
              <Mic
                className="absolute right-3 top-2.5 text-emerald-700 cursor-pointer"
                size={20}
              />
            </div>
          </motion.div>

          {/* Desktop Navigation Icons */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/checkout" className="relative cursor-pointer">
                <ShoppingCart className="text-emerald-700" size={24} />
                {cartItems.length > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-emerald-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            <div className="relative" ref={profileMenuRef}>
              <motion.button
                onClick={handleUserProfileClick}
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-700">
                  <img
                    src={Avatar}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isAuthenticated && user && (
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.name}
                  </span>
                )}
              </motion.button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      Signed in as{" "}
                      <span className="font-bold">{user?.email}</span>
                    </div>
                    <Link
                      to="/user"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} className="mr-2" />
                      Your Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 space-y-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="I'm shopping for...."
                  className="w-full py-2 border border-emerald-700 rounded-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search
                  className="absolute left-3 top-2.5 text-emerald-700"
                  size={20}
                />
                <Mic
                  className="absolute right-3 top-2.5 text-emerald-700 cursor-pointer"
                  size={20}
                />
              </div>

              {/* Mobile Icons */}
              <div className="flex justify-around items-center pt-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/checkout"
                    className="relative cursor-pointer flex flex-col items-center"
                  >
                    <ShoppingCart className="text-emerald-700" size={24} />
                    <span className="text-xs mt-1">
                      Cart {cartItems.length > 0 && `(${cartItems.length})`}
                    </span>
                  </Link>
                </motion.div>

                <div className="flex flex-col items-center">
                  <motion.button
                    onClick={handleUserProfileClick}
                    className="cursor-pointer flex flex-col items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-emerald-700">
                      <img
                        src={Avatar}
                        alt="User Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs mt-1">
                      {isAuthenticated && user ? user.name : "Sign In"}
                    </span>
                  </motion.button>

                  {isAuthenticated && (
                    <motion.button
                      onClick={handleSignOut}
                      className="mt-2 text-xs flex items-center text-red-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <LogOut size={12} className="mr-1" />
                      Sign out
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;
