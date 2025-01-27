import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  homeCategory,
  products,
  newArrivals,
  trending
} from "./ProductDetails";
import ImageCarousel from "./ImageCarousel";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("NEW");

  // filter the product based on the selected category
  const categoryProduct =
    selectedCategory === "NEW"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 ">
      <div className="py-2 sm:py-4">
        <div className="flex gap-8 my-4 sm:my-6 overflow-x-auto whitespace-nowrap">
          {/* Home Page Categories */}
          {homeCategory.map((item) => (
            <Link
              to="#"
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`rounded-lg px-4 py-2 border border-emerald-700 flex-shrink-0 text-sm sm:text-base text-emerald-700 cursor-pointer transition-colors duration-200 ${
                selectedCategory === item ? "bg-emerald-700 text-white" : ""
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="w-full mx-auto">
          <ImageCarousel />
        </div>
      </div>

      {/* New Arrivals */}
      <div className="my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">New Arrivals</h2>
          <button className="font-semibold text-base md:text-xl">
            See More
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 p-4 md:p-8">
          {newArrivals.map((item) => (
            <Link
              key={item.id}
              className="bg-white rounded-lg p-4 sm:p-8 flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative mb-2 sm:mb-4 flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 truncate">
                    {item.name}
                  </h3>
                  <span className="block text-sm sm:text-base text-gray-400 mb-2">
                    {item.size}
                  </span>
                  <span className="block text-sm sm:text-base text-gray-400 mb-2">
                    {item.color}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 text-sm sm:text-base font-semibold">
                    ₦ {item.price}
                  </span>
                  <Link
                    to={`/productpage/${item.id}`}
                    className="text-emerald-700 border border-emerald-700 px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trending...</h2>
          {/* <ChevronRight className="text-gray-600" size={24} /> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 md:p-8">
          {trending.map((item) => (
            <Link
              key={item.id}
              className="bg-white rounded-lg p-4 sm:p-8 flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative mb-2 sm:mb-4 flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-auto object-cover rounded-lg mb-4"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 truncate">
                    {item.name}
                  </h3>
                  <span className="block text-sm sm:text-base text-gray-400 mb-2">
                    {item.size}
                  </span>
                  <span className="block text-sm sm:text-base text-gray-400 mb-2">
                    {item.color}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 text-sm sm:text-base font-semibold">
                    ₦ {item.price}
                  </span>
                  <Link
                    to={`/productpage/${item.id}`}
                    className="text-emerald-700 border border-emerald-700 px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
