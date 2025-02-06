import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CreditCard,
  Gift,
  User,
  User2,
  Phone
} from "lucide-react";
import { useFormValidation } from "../utils/validateForm";

const Checkout = ({ onClose, setShowConfirmation }) => {
  const navigate = useNavigate();

  // const handleClose = () => {
  //   navigate(-1); // go back to the previous page
  // };
  const { checkoutForm, setCheckoutForm, errors, validateCheckoutForm } =
    useFormValidation({
      name: "",
      address: "",
      phone: "",
      email: ""
    });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateCheckoutForm()) {
      try {
        setIsSubmitting(true);

        //Place API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        onClose();
        setShowConfirmation(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to={`/cartpage/${product}`} className="mb-6">
        <ArrowLeft className="text-gray-600" />
      </Link>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded-lg mb-6">
        <h2 className="text-gray-600 text-lg mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Items (1)</span>
            <span>₦ 10,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery fees</span>
            <span>₦ 1,050</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-gray-600">Total</span>
            <span>₦ 11,050</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 max-w-2xl mx-auto px-4 sm:px-6 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <input
              type="text"
              name="Full Name"
              id="Full Name"
              placeholder="janeSmith"
              value={checkoutForm.name}
              onChange={(e) =>
                setCheckoutForm({ ...checkoutForm, name: e.target.value })
              }
              className={`w-full pl-10 mr-4 p-2 border rounded-lg ${
                errors.name ? "border-red-500 " : "border-emerald-700"
              }`}
            />
            <User2 className="absolute left-3 top-2.5 items-center" />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="janeSmith@example.com"
              value={checkoutForm.email}
              onChange={(e) =>
                setCheckoutForm({ ...checkoutForm, email: e.target.value })
              }
              className={`w-full pl-10 mr-4 p-2 border rounded-lg ${
                errors.email ? "border-red-500 " : "border-emerald-700"
              }`}
            />
            <User className="absolute left-3 top-2.5 items-center" />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="tel"
              name="Phone Number"
              id="Phone Number"
              placeholder="+234 555 555 5555"
              value={checkoutForm.phone}
              onChange={(e) =>
                setCheckoutForm({ ...checkoutForm, phone: e.target.value })
              }
              className={`w-full pl-10 mr-4 p-2 border rounded-lg ${
                errors.phone ? "border-red-500 " : "border-emerald-700"
              }`}
            />
            <Phone className="absolute left-3 top-2.5 items-center" />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <p className="text-sm">other payment alternative?</p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex cursor-pointer">
              <Gift size={20} className="text-emerald-700 mr-2" />
              <span>Pay with Gift Card</span>
            </div>
            <div className="flex cursor-pointer">
              <CreditCard size={20} className="text-emerald-700 mr-2" />
              <span>Pay with Credit Card</span>
            </div>
            <div className="flex cursor-pointer">
              <Building2 size={20} className="text-emerald-700 mr-2" />
              <span>Pay with PayPal</span>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pb-4">
            <button
              type="submit"
              // onClick={handleClose}
              className={`p-2 rounded-lg text-black bg-gray-400 hover:bg-emerald-800 hover:text-white ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`p-2 rounded-lg text-white bg-emerald-700 hover:bg-emerald-800 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Processing" : "Place Order"}
            </button>
          </div>
          {isSubmitting && (
            <div className="text-gray-600 text-sm mt-2">Submitting...</div>
          )}
          {errors.general && (
            <p className="text-red-500 text-sm mt-2">{errors.general}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Checkout;
