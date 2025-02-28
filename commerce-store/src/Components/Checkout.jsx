import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useAuth } from "../utils/CartContext";
import { useFormValidation } from "../utils/validateForm";
import { FaShopify } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaAmazonPay, FaCircle, FaApplePay, FaCcPaypal } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  buttonVariants,
  fadeIn
} from "./Animation";

const Checkout = () => {
  const navigate = useNavigate(); // for redirecting user
  const { isAuthenticated, user } = useAuth(); // use authentication context
  const [giftCard, setGiftCard] = useState("");
  const [emailOffers, setEmailOffers] = useState(false);
  const { cartItems, total, removeFromCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { checkoutForm, setCheckoutForm, errors, validateCheckoutForm } =
    useFormValidation({
      name: "",
      address: "",
      phone: "",
      email: "",
      city: "",
      country: "",
      state: ""
    });

  // check if user is authenticated on mount
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate("/login", {
        state: {
          from: "/checkout",
          message: "Please Sign in to complete your checkout"
        }
      });
    } else if (user?.email) {
      // pre-fill email if user is logged in
      setCheckoutForm((prev) => ({
        ...prev,
        email: user.email,
        name: user.name || prev.name
      }));
    }
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Double check form validation before submitting
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/checkout",
          message: "Please sign in to complete your checkout"
        }
      });
      return;
    }

    if (validateCheckoutForm()) {
      try {
        setIsSubmitting(true);
        // fake Api call
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s
        // Handle successful checkout
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm({
      ...checkoutForm,
      [name]: value
    });
  };

  // if not authenticated,
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-200 bg-opacity-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8"
        >
          <FaCircle className="animate-spin h-8 w-8 mx-auto mb-4 text-emerald-800" />
          <p className="text-lg">Checking authentication status...</p>
          <p className="text-sm text-gray-600 mt-2">
            You'll be redirected to sign in if needed.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-emerald-200 bg-opacity-10 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side Form */}
          <motion.div
            className="w-full md:w-3/5 lg:w-2/3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-8" variants={itemVariants}>
              {/* BreadCrumb Navigation */}
              <div className="flex items-center text-sm text-gray-500 mt-12 mb-6">
                <span>Product</span>
                <MdOutlineKeyboardArrowRight
                  size={14}
                  className="h-4 w-4 mx-2"
                />
                <span>Shipping</span>
                <MdOutlineKeyboardArrowRight
                  size={14}
                  className="h-4 w-4 mx-2"
                />
                <span>Payment</span>
              </div>
            </motion.div>

            {/* User welcome message */}
            <motion.div
              className="mb-6 bg-emerald-50 p-4 rounded-lg border border-emerald-100"
              variants={fadeIn}
            >
              <p className="text-emerald-800">
                Welcome back,{" "}
                <span className="font-medium">
                  {user?.name || "valued customer"}
                </span>
                ! You're signed in as {user?.email}.
                <Link to="/login" className="ml-2 text-emerald-700 underline">
                  Not you?
                </Link>
              </p>
            </motion.div>

            {/* Express Checkout Option */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h2 className="text-lg font-medium mb-4 text-center">
                Express Checkout
              </h2>
              <div className="grid grid-cols-4 gap-2">
                <motion.button
                  className="bg-indigo-600 text-white p-3 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">ApplePay</span>
                  <FaApplePay className="w-full h-6 " />
                </motion.button>
                <motion.button
                  className="bg-yellow-400 text-white p-3 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">AmazonPay</span>
                  <FaAmazonPay className="w-full h-6 " />
                </motion.button>
                <motion.button
                  className="bg-white border border-gray-300 text-white p-3 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Shopify</span>
                  <FaShopify className="w-full h-6 " />
                </motion.button>
                <motion.button
                  className="bg-yellow-500 text-white p-3 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">PayPal</span>
                  <FaCcPaypal className="w-full h-6 " />
                </motion.button>
              </div>

              <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">
                  OR CONTINUE BELOW TO PAY WITH A CREDIT CARD
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </motion.div>

            {/* Checkout Form */}
            <motion.form onSubmit={handleSubmit} variants={containerVariants}>
              {/* Contact Information */}
              <motion.div className="mb-6" variants={itemVariants}>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-medium">Contact Information</h2>
                </div>

                <div className="mb-4">
                  <motion.input
                    type="email"
                    name="email"
                    id="email"
                    value={checkoutForm.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className={`w-full p-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    readOnly={user?.email} // Make readOnly if user is logged in
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        className="mt-1 text-sm text-red-500"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="emailOffers"
                    id="emailOffers"
                    checked={emailOffers}
                    onChange={(e) => setEmailOffers(e.target.checked)}
                    className="h-4 w-4 text-emerald-700 rounded"
                  />
                  <label
                    htmlFor="emailOffers"
                    className="ml-2 text-sm text-emerald-700"
                  >
                    Email me with news and offers
                  </label>
                </div>
              </motion.div>

              {/* Shipping address */}
              <motion.div className="mb-6" variants={itemVariants}>
                <h2 className="text-lg font-medium mb-3">Shipping Address</h2>

                <div className="mb-4">
                  <motion.input
                    type="text"
                    name="name"
                    id="name"
                    value={checkoutForm.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className={`w-full apperance-none p-3 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        className="mt-1 text-sm text-red-500"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-4">
                  <motion.input
                    type="text"
                    name="address"
                    id="address"
                    value={checkoutForm.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className={`w-full appearance-none p-3 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <AnimatePresence>
                    {errors.address && (
                      <motion.p
                        className="mt-1 text-sm text-red-500"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {errors.address}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-4">
                  <motion.input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={checkoutForm.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className={`w-full appearance-none p-3 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p
                        className="mt-1 text-sm text-red-500"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-4">
                  <motion.input
                    type="text"
                    name="city"
                    id="city"
                    value={checkoutForm.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className={`w-full appearance-none p-3 border ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <AnimatePresence>
                    {errors.city && (
                      <motion.p
                        className="mt-1 text-sm text-red-500"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {errors.city}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="relative">
                    <motion.select
                      id="country"
                      name="country"
                      value={checkoutForm.country}
                      onChange={handleInputChange}
                      className="appearance-none w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      required
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="">Select Country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">UK</option>
                    </motion.select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <motion.select
                      id="state"
                      name="state"
                      value={checkoutForm.state}
                      onChange={handleInputChange}
                      className="appearance-none w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      required
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="">State</option>
                      <option value="LG">Lagos</option>
                      <option value="ABJ">Abuja</option>
                      <option value="IB">Ibadan</option>
                      {/* Add remaining states */}
                    </motion.select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                aria-label="Submit Button"
                className={`w-full md:w-auto md:ml-auto md:flex md:items-center md:justify-center bg-emerald-800 text-white py-3 px-6 rounded uppercase tracking-wide font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <FaCircle className="animate-spin -ml-1 mr-2 h-4 w-4 text-white opacity-25" />
                    Processing...
                  </div>
                ) : (
                  "Complete Order"
                )}
              </motion.button>
            </motion.form>

            {/* Footer links */}
            <motion.div
              className="mt-8 text-sm text-gray-500 flex space-x-4"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <a href="#" className="hover:text-gray-700">
                Refund Policy
              </a>
              <a href="#" className="hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-700">
                Terms of Service
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side Order Summary */}
          <motion.div
            className="w-full md:w-2/5 lg:w-1/3 bg-gray-50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-white p-8 border border-gray-200 rounded-lg">
              {/* Cart Items */}
              <div className="max-h-96 overflow-y-auto mb-4">
                {cartItems.length === 0 ? (
                  <motion.p
                    className="text-gray-500 text-center py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Your cart is empty
                  </motion.p>
                ) : (
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex pb-4 mb-4 mt-8 border-b border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        layout
                      >
                        <div className="relative h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.img ? (
                            <img
                              src={item.img}
                              alt={item.name}
                              className="h-14 w-14 object-cover rounded"
                            />
                          ) : (
                            <svg
                              className="h-10 w-10 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m0 0l-2 1m2-1v2.5M14 4l-2 1m0 0l-2-1m2 1v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 7l2-1m-2 1l2 1m-2-1v2.5"
                              />
                            </svg>
                          )}
                          {item.quantity > 1 && (
                            <motion.div
                              className="absolute -top-2 -right-2 h-5 w-5 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              {item.quantity}
                            </motion.div>
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          {item.size && (
                            <p className="text-sm text-gray-500">
                              Size {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-sm text-gray-500">
                              {item.color}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm font-medium text-gray-900">
                            ₦{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <motion.button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-500 hover:text-red-700 mt-1"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            Remove
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Gift Card */}
              <motion.div
                className="py-4 border-b border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="flex">
                  <motion.input
                    type="text"
                    id="giftCard"
                    value={giftCard}
                    onChange={(e) => setGiftCard(e.target.value)}
                    placeholder="Gift card"
                    className="flex-grow p-2.5 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <motion.button
                    type="button"
                    className="bg-gray-200 text-gray-700 px-4 py-2.5 rounded-r font-medium text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    whileHover={{ backgroundColor: "#d1d5db" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply
                  </motion.button>
                </div>
              </motion.div>

              {/* Summary */}
              <motion.div
                className="py-4 border-b border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-gray-700">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    ₦{total.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-gray-700">Shipping</p>
                  <p className="text-sm text-gray-500">
                    Calculated at next step
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-gray-700">Tax</p>
                  <p className="text-sm text-gray-500">
                    Calculated at next step
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ** Expedited orders cannot be shipped or delivered on
                  weekends/holidays nor can they be shipped to P.O. box.
                </p>
              </motion.div>

              {/* Total */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <div className="flex justify-between">
                  <p className="text-base font-medium text-gray-700">Total</p>
                  <motion.p
                    className="text-xl font-bold text-gray-900"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      delay: 0.7
                    }}
                  >
                    <span className="text-sm font-normal text-gray-400 mr-1">
                      NGN
                    </span>
                    ₦{total.toFixed(2)}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Live Chat Button */}
      <motion.div
        className="fixed bottom-4 right-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 1,
          type: "spring",
          stiffness: 400,
          damping: 10
        }}
      >
        <motion.button
          className="bg-black text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Checkout;
