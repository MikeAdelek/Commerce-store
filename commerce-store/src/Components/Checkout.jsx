import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, Building2, CreditCard, Gift } from "lucide-react";
import { useCart } from "../utils/CartContext";
import { useFormValidation } from "../utils/validateForm";
import { FaShopify } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaAmazonPay, FaCircle, FaApplePay, FaCcPaypal } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa6";

const Checkout = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCheckoutForm()) {
      try {
        setIsSubmitting(true);
        // fake Api call
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s
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

  return (
    <div className="bg-emerald-200 bg-opacity-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side Form */}
          <div className="w-full md:w-3/5 lg:w-2/3">
            <div className="mb-8">
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
            </div>

            {/* Express Checkout Option */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4 text-center">
                Express Checkout
              </h2>
              <div className="grid grid-cols-4 gap-2">
                <button className="bg-indigo-600 text-white p-3 rounded">
                  <span className="sr-only">ApplePay</span>
                  <FaApplePay className="w-full h-6 " />
                </button>
                <button className="bg-yellow-400 text-white p-3 rounded">
                  <span className="sr-only">AmazonPay</span>
                  <FaAmazonPay className="w-full h-6 " />
                </button>
                <button className="bg-white border border-gray-300 text-white p-3 rounded">
                  <span className="sr-only">ApplePay</span>
                  <FaApplePay className="w-full h-6 " />
                </button>
                <button className="bg-yellow-500 text-white p-3 rounded">
                  <span className="sr-only">PayPal</span>
                  <FaCcPaypal className="w-full h-6 " />
                </button>
              </div>

              <div classNane="relative flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">
                  OR CONTINUE BELOW TO PAY WITH A CREDIT CARD
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-medium">Contact Information</h2>
                  <div className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-emerald-800">
                      Log in
                    </Link>
                  </div>
                </div>

                <div className="mb-4">
                  <input
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
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
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
              </div>

              {/* Shipping address */}
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Shipping Address</h2>

                <div className="mb-4">
                  <input
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
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={checkoutForm.address}
                    onChange={handleInputChange}
                    placeholder="Adddress"
                    className={`w-full appearance-none p-3 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                    required
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <input
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
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="City"
                    id="city"
                    value={checkoutForm.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className={`w-full appearance-none p-3 border ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                    required
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="relative">
                    <select
                      id="country"
                      value={checkoutForm.country}
                      onChange={handleInputChange}
                      className="appearance-none w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      required
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">UK</option>
                    </select>
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
                    <select
                      id="state"
                      value={checkoutForm.state}
                      onChange={handleInputChange}
                      className="appearance-none w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      required
                    >
                      <option value="">State</option>
                      <option value="LG">Lagos</option>
                      <option value="ABJ">Abuja</option>
                      <option value="IB">Ibadan</option>
                      {/* Add remaining states */}
                    </select>
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
              </div>
              <button
                type="submit"
                disable={isSubmitting}
                aria-label="Submit Button"
                className={`w-full md:w-auto md:ml-auto md:flex md:items-center md:justify-center bg-emerald-800 text-white py-3 px-6 rounded uppercase tracking-wide font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700 ${
                  isSubmitting ? "opacity: 70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <FaCircle className="animate-spin -ml-1 mr-2 h-4 w-4 text-white opacity-25" />
                    Processing...
                  </div>
                ) : (
                  "Complete Order"
                )}
              </button>
            </form>

            <div className="mt-8 text-sm text-gray-500 flex space-x-4">
              <a href="#" className="hover:text-gray-700">
                Refund Policy
              </a>
              <a href="#" className="hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-700">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Right Side Order Summary */}
          <div className="w-full md:w-2/5 lg:w-1/3 bg-gray-50">
            <div className="bg-white p-8 border border-gray-200 rounded-lg">
              {/* Cart Items */}
              <div className="max-h-96 overflow-y-auto mb-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Your cart is empty
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex pb-4 mb-4 mt-8 border-b border-gray-200"
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
                          <div className="absolute -top-2 -right-2 h-5 w-5 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">
                            {item.quantity}
                          </div>
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
                          <p className="text-sm text-gray-500">{item.color}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium text-gray-900">
                          ₦{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Gift Card */}
              <div className="py-4 border-b border-gray-200">
                <div className="flex">
                  <input
                    type="text"
                    id="giftCard"
                    value={giftCard}
                    onChange={(e) => setGiftCard(e.target.value)}
                    placeholder="Gift card"
                    className="flex-grow p-2.5 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 px-4 py-2.5 rounded-r font-medium text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="py-4 border-b border-gray-200">
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
              </div>

              {/* Total */}
              <div className="pt-4">
                <div className="flex justify-between">
                  <p className="text-base font-medium text-gray-700">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    <span className="text-sm font-normal text-gray-400 mr-1">
                      NRA
                    </span>
                    ₦{total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-black text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150">
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
        </button>
      </div>
    </div>
  );
};

export default Checkout;
