import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Filter, X } from "lucide-react";
import { categories, filters, categoryProducts } from "./ProductDetails";
import { useCart } from "../utils/CartContext";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  categoryVariants,
  filterVariants,
  productCardVariants,
  chipVariants,
  buttonVariants
} from "./Animation";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("APPLIANCES");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const { addToCart } = useCart();
  const controls = useAnimation();

  // Animate when filters change
  useEffect(() => {
    const animateFilters = async () => {
      await controls.start("hidden");
      await controls.start("visible");
    };

    animateFilters();
  }, [selectedFilters, controls]);

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

  const filteredProducts = categoryProducts.filter((categoryProducts) => {
    // implement your filtering logic here
    return Object.entries(selectedFilters).every(
      ([category, selectedItems]) =>
        selectedItems.length === 0 ||
        selectedItems.includes(categoryProducts[category.toLowerCase()])
    );
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 pt-24">
        {/* categories - scrollable on mobile */}
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap gap-4 my-4 sm:my-6"
        >
          {categories.map((nav, index) => (
            <div
              key={nav}
              variants={categoryVariants}
              custom={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to="/"
                className={`rounded-lg px-4 py-2 border border-emerald-700 text-sm sm:text-base text-emerald-700 cursor-pointer ${
                  selectedCategory === nav ? "bg-emerald-700 text-white" : ""
                }`}
              >
                {nav}
              </NavLink>
            </div>
          ))}
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 sm:p-8">
          {/* Mobile  filter  toggle*/}
          <motion.div
            variants={itemVariants}
            className="md:hidden flex justify-end mb-4"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleFilter}
              className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-md"
            >
              <Filter size={20} />
              Filters
            </motion.button>
          </motion.div>

          {/* Filter - Mobile & Desktop Sidebar */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 768) && (
              <div
                className={`fixed inset-0 z-50 bg-white md:w-48 p-8 sm:p-6 ${
                  isFilterOpen ? "block" : "hidden md:block"
                }`}
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exist="exist"
              >
                <div className="p-4 md:p-0 h-full overflow-y-auto">
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-between mb-4 md:mb-4"
                  >
                    <span className="font-medium text-lg">Filters</span>
                    <motion.button
                      aria-label="clearFilter"
                      onClick={clearFilters}
                      className="text-gray-400 text-sm"
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear all
                    </motion.button>
                    <motion.button
                      aria-label="Close"
                      onClick={toggleFilter}
                      className="md:hidden text-emerald-700"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>
                  </motion.div>

                  {/* Active Filters */}
                  <motion.div
                    layout
                    className="flex flex-wrap gap-2 mb-4 cursor-pointer"
                  >
                    <AnimatePresence>
                      {Object.entries(selectedFilters).flatMap(([cat, items]) =>
                        items.map((item) => (
                          <motion.span
                            key={`${cat}-${item}`}
                            className="bg-emerald-900 text-white px-3 py-1 rounded-full text-sm"
                            variant={chipVariants}
                            initial="initial"
                            animate="visible"
                            exist="exist"
                            whileHover="hover"
                            layout
                            onClick={() => handleFilterChange(cat, item)}
                          >
                            {item}
                          </motion.span>
                        ))
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Filter Categories */}
                  {Object.entries(filters).map(([category, items], index) => (
                    <motion.div
                      key={category}
                      className="mb-6"
                      variant={itemVariants}
                      custom={index}
                    >
                      <motion.h3
                        className="uppercase text-[#3F646A] mb-2"
                        variants={itemVariants}
                      >
                        {category}
                      </motion.h3>
                      {items.map((item, index) => (
                        <motion.div
                          key={item}
                          className="flex items-center gap-2 mb-2"
                          variants={itemVariants}
                          custom={index}
                          whileHover={{ x: 5 }}
                        >
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
                        </motion.div>
                      ))}
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#f97316" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleFilter}
                    aria-label="Apply"
                    className="bg-orange-500 text-white px-6 py-2 rounded-md w-full md:block"
                  >
                    Apply
                  </motion.button>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Products Sections */}
          <motion.div variants={containerVariants} className="flex-1">
            <motion.div
              variants={itemVariants}
              className="flex justify-between items-center mb-4 sm:mb-6"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="sm:text-2xl text-xl"
              >
                Gadgets
              </motion.h2>
              <motion.select
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border rounded-md p-1 sm:p-2 bg-emerald-700 text-white text-sm sm:text-base"
              >
                <option value="">Lowest Price</option>
                <option value="">Most Popular</option>
              </motion.select>
            </motion.div>

            <motion.div
              variants={containerVariants}
              animate={controls}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.a
                    href={`/productpage/${product.id}`}
                    key={product.id}
                    variants={productCardVariants}
                    custom={index}
                    whileHover="hover"
                    whileTap="tap"
                    layout
                    initial="hidden"
                    animate="visible"
                    exist={{ opacity: 0, scale: 0.8 }}
                    className="bg-white rounded-lg p-4 sm:p-6 flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative mb-2 sm:mb-4 flex-shrink-0"
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-72 object-cover
                      rounded-lg"
                      />
                      {product.discount && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="absolute top-2 left-2 bg-pink-500 text-white px-1 sm:px-2 py-1 rounded text-xs sm:text-sm"
                        >
                          {product.discount}
                        </motion.span>
                      )}
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart
                          className={`absolute top-2 right-2 ${
                            product.favorite
                              ? "text-red-500 fill-red-500"
                              : "text-gray-300"
                          } `}
                          size={20}
                        />
                      </motion.div>
                    </motion.div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="font-medium text-sm sm:text-base mb-1 sm:mb-2 truncate"
                        >
                          {product.name}
                        </motion.h3>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="block text-sm sm:text-base text-gray-400 mb-2"
                        >
                          {product.color}
                        </motion.span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-between items-center"
                      >
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="text-orange-500 text-sm sm:text-base font-semibold"
                        >
                          ₦ {product.price}
                        </motion.span>
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(16, 185, 129, 0.1)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => addToCart(product)}
                          className="text-emerald-700 border border-emerald-700 px-2 py-1 rounded text-xs sm:text-sm"
                        >
                          Add to Cart
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Category;
