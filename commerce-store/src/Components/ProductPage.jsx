import React, { useState } from "react";
import { productPageImage, reviews } from "./ProductDetails";
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

const ProductPage = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("green");
  const { addToCart } = useCart();

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* ProductPage */}
      <Link to="/" className="flex items-center gap-4 mb-6">
        <ArrowLeft className="text-gray-600" />
        <h1 className="text-gray-600 text-lg">Product</h1>
      </Link>

      {/* Image Gallery */}
      <div className="mb-6">
        <img
          src={productPageImage[selectedImage]}
          alt="Product"
          className="w-full h-80 object-cover rounded-lg mb-4"
        />
        <div className="flex justify-center gap-4">
          {productPageImage.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail${index + 1}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer ${
                selectedImage === index ? "border-2 border-emerald-700" : ""
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="mb-6">
        <h2 className="text-xl text-gray-700 mb-4">
          500ml Ceramic multipurpose mug with 2 coffee cups.
        </h2>
        <div className="flex gap-2 mb-4">
          {["green", "red", "blue"].map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full ${
                color === "green"
                  ? "bg-emerald-700"
                  : color === "red"
                  ? "bg-red-500"
                  : "bg-blue-500"
              } ${
                selectedColor === color
                  ? "ring-2 ring-offset-2 ring-gray-400"
                  : ""
              }`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold">₦10,000</span>
            <p className="text-orange-500 text-sm">Almost Sold out</p>
          </div>
          <div className="flex gap-3">
            <ShoppingCart className="text-gray-600" />
            <Heart className="text-gray-600" />
            <Share2 className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mb-6">
        <h3 className="text-lg text-gray-600 mb-2">Product Description</h3>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, vel earum consequunter nem voluptatum quod
          et commod ecom em magnimo et dolorum sequi sed consequatur
          exercitationem nam eligendi architecto.
        </p>
      </div>

      {/* Reviews */}
      <div className="mb-8">
        <h3 className="text-lg text-gray-600 mb-4">Customers review</h3>

        {reviews.map((review, index) => (
          <div key={index} className="mb-3">
            <p className="font-medium mb-1">{review.name}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Place Order Button */}
      <Link
        to={`/cartpage/${product}`}
        className="bg-orange-500 text-white flex justify-center p-4 rounded-lg"
      >
        Place Order
      </Link>
    </div>
  );
};

export default ProductPage;
