import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Filter } from "lucide-react";
import { categories, filters, products } from "./ProductDetails";

const Category = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (category, item) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category]
        ? prev[category].includes(item)
          ? prev[category].filter((i) => i !== item)
          : [...prev[category], item]
        : [item]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* categories - scrollable on mobile */}
        <div className="flex gap-4 my-4 sm:my-6 overflow-x-auto">
          {categories.map((item) => (
            <NavLink
              to="/"
              key={item}
              className="flex-shrink-0 text-sm sm:text-base text-emerald-700 hover:underline"
            >
              {item}
            </NavLink>
          ))}
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-8">
          {/* Mobile  filter  toggle*/}
          <div className="md:hidden flex justify-end mb-4">
            <button
              onClick={toggleFilter}
              className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-md"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Filter - Mobile & Desktop Sidebar */}
          <div
            className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ${
              isFilterOpen ? "translate-x-0" : "translate-x-full"
            } md:relative md:translate-x-0 md:block md:w-48 ${
              isFilterOpen ? "block" : "hidden"
            }`}
          >
            <div className="p-4 md:p-0 h-full overflow-y-auto">
              <div className="flex justify-between mb-4 md:mb-4">
                <span className="font-medium text-lg">Filters</span>
                <button
                  aria-label="clearFilter"
                  onClick={clearFilters}
                  className="text-gray-400 text-sm"
                  type="submit"
                >
                  Clear all
                </button>
                <button
                  aria-label="Close"
                  onClick={toggleFilter}
                  className="md:hidden text-emerald-700"
                >
                  Close
                </button>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mb-4 cursor-pointer">
                <div className="flex flex-wrap gap-2 mb-4 cursor-pointer">
                  <span className="bg-emerald-900 text-white px-3 py-1 rounded-full text-sm">
                    Office
                  </span>
                  <span className="bg-emerald-900 text-white px-3 py-1 rounded-full text-sm">
                    Home
                  </span>
                  <span className="bg-emerald-900 text-white px-3 py-1 rounded-full text-sm">
                    Gaming
                  </span>
                </div>
                {Object.entries(selectedFilters).flatMap(([cat, items]) =>
                  items.map((item) => (
                    <span
                      key={`${cat}-${item}`}
                      className="bg-emerald-900 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))
                )}
              </div>

              {/* Filter Categories */}
              {Object.entries(filters).map(([category, items]) => (
                <div key={category} className="mb-6">
                  <h3 className="uppercase text-[#3F646A] mb-2">{category}</h3>
                  {items.map((item) => (
                    <div key={item} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={
                          selectedFilters[category]?.includes(item) || false
                        }
                        onChange={() => handleFilterChange(category, item)}
                        className="rounded border-gray-300"
                      />
                      <label className="text-[#3F646A] cursor-pointer">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <button
                onClick={toggleFilter}
                aria-label="Apply"
                className="bg-orange-500 text-white px-6 py-2 rounded-md w-full md:block"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Products Sections */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="sm:text-2xl text-xl">Gadgets</h2>
              <select className="border rounded-md p-1 sm:p-2 bg-emerald-700 text-white text-sm sm:text-base">
                <option value="">Lowest Price</option>
                <option value="">Most Popular</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 rounded-lg p-4 sm:p-8"
                >
                  <div className="relative mb-2 sm:mb-4">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-24 sm:h-48 object-cover
                      rounded-lg"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-pink-500 text-white px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                        {product.discount}
                      </span>
                    )}
                    {product.favorite && (
                      <Heart
                        className="absolute top-2 right-2 text-red-500 fill-red-500"
                        size={20}
                      />
                    )}
                  </div>
                  <h3 className="font-medium text-sm sm:text-base mb-1 sm:mb-2 truncate">
                    {product.name}
                  </h3>
                  <span className="flex items-center gap-2">
                    {product.color}
                  </span>
                  <div className="flex justify-between items-center text-sm sm:text-base text-gray-400">
                    <span className="text-orange-500 text-sm sm:text-base">
                      ₦ {product.price}
                    </span>
                    <Link
                      to={`/productpage/${product.id}`}
                      className="text-emerald-700 border border-emerald-700 px-2 py-1 rounded text-xs sm:text-sm"
                    >
                      Add to Cart
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
