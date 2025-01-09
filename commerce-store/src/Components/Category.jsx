import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart } from "lucide-react";
// import Header from "./header";
import { categories, filters, products } from "./ProductDetails";

const Category = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* categories */}
        <div className="flex gap-4 my-6">
          {categories.map((item) => (
            <NavLink
              to="/"
              key={item}
              className="text-emerald-700 hover:underline"
            >
              {item}
            </NavLink>
          ))}
        </div>

        {/* Main content */}
        <div className="flex gap-8">
          {/* filters */}
          <div className="w-48">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Filters</span>
              <button className="text-gray-400 text-sm" type="submit">
                Clear all
              </button>
            </div>

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

            {Object.entries(filters).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="uppercase text-[#3F646A] mb-2">{category}</h3>
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="" className="text-[#3F646A] cursor-pointer">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md w-full">
              Apply
            </button>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl">Gadgets</h2>
              <select className="border rounded-md p-2 bg-emerald-700 text-white">
                <option value="">Lowest Price</option>
                <option value="">Most Popular</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-50 rounded-lg p-8">
                  <div className="relative mb-4">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-48 object-cover
                      rounded-lg"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded text-sm">
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
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500">₦ {product.price}</span>
                    <Link
                      to={`/productpage/${product.id}`}
                      className="text-emerald-700 border border-emerald-700 px-3 py-1 rounded text-sm"
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
