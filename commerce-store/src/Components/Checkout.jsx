import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, CreditCard, Gift } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // go back to the previous page
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button onClick={handleClose} className="mb-6">
        <ArrowLeft className="text-gray-600" />
      </button>
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
      {/* Payment Method  */}
      <div className="bg-white p-4 rounded-lg mb-6">
        <h2 className="text-gray-600 text-lg mb-4">Payment Methods</h2>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="Bank"
              placeholder="WithBank..."
              className="border border-blue-500 rounded-lg p-4 pl-12 w-full"
            />
            <Building2 className="text-gray-600 absolute left-3.5 top-4" />
            {/* <span className="text-gray-500">With Bank...</span> */}
          </div>
          <div className="relative">
            <input
              type="text"
              name="Card"
              placeholder="WithCard..."
              className="border border-blue-500 rounded-lg p-4 pl-12 w-full"
            />
            <CreditCard className="text-gray-600 absolute left-3.5 top-4" />
            {/* <span className="text-gray-500">With Bank...</span> */}
          </div>
          <div className="relative">
            <input
              type="text"
              name="Coupons"
              placeholder="WithCoupons..."
              className="border border-blue-500 rounded-lg p-4 pl-12 w-full"
            />
            <Gift className="text-gray-600 absolute left-3.5 top-4" />
            {/* <span className="text-gray-500">With Bank...</span> */}
          </div>
        </div>
      </div>
      {/* Address  */}
      <div className="bg-white rounded-lg mb-6">
        <h2 className="text-gray-600 text-lg mb-4">Address</h2>
        <p className="text-gray-500 mb-4">
          Lorem ipsum dolor sit amet, vel earum consequunter nem voluptatum quod
          et cumque quas in numquam experimens. A pariatur rerum qui magni nemo
          ut magni labore ut dolor amet et dolorum sequi sed consequatur
          exercitationem nam eligendi architecto.
        </p>
        <div className="flex gap-4">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">
            Confirm Address
          </button>
          <button className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg">
            Change Address
          </button>
        </div>
      </div>
      {/* Delivery Records */}
      <div className="bg-white rounded-lg mb-6">
        <h2 className="text-gray-600 text-lg mb-4">Delivery Records</h2>
        <p className="text-gray-500 mb-4">
          Lorem ipsum dolor sit amet, vel earum consequunter nem voluptatum quod
          et cumque quas in numquam experimens. A pariatur rerum qui magni nemo
          ut magni labore ut dolor amet et dolorum sequi sed consequatur
          exercitationem nam eligendi architecto.
        </p>
      </div>
      {/* Confirm Order Button  */}
      <button className="w-full bg-orange-500 text-white py-3 rounded-lg">
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
