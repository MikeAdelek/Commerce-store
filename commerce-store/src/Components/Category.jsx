import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // hooks
  const { addToCart } = useCart();
  const controls = useAnimation();

  // track window resize
  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth >= 768) {
          setIsFilterOpen(false);
        }
      }, 150); // debounce resize events
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Animate when filters change
  useEffect(() => {
    const animateFilters = async () => {
      await controls.start("hidden");
      await controls.start("visible");
    };

    animateFilters();
  }, [selectedFilters, controls]);

  // callbacks for better performance
  const toggleFilter = useCallback(() => {
    setIsFilterOpen((prev) => !prev);
  }, []);

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const handleFilterChange = useCallback((category, item) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category]
        ? prev[category].includes(item)
          ? prev[category].filter((i) => i !== item)
          : [...prev[category], item]
        : [item]
    }));
  }, []);

  const handleAddToCart = useCallback(
    (e, product) => {
      e.preventDefault();
      e.stopPropagation();

      // ensure price is a number
      const productToAdd = {
        ...product,
        quantity: 1,
        price: parseFloat(product.price)
      };
      addToCart(productToAdd);
    },
    [addToCart]
  );

  // Memoized for better performance
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((categoryProducts) => {
      // implement your filtering logic here
      return Object.entries(selectedFilters).every(
        ([category, selectedItems]) =>
          selectedItems.length === 0 ||
          selectedItems.includes(categoryProducts[category.toLowerCase()])
      );
    });
  }, [selectedFilters]);

  // Render components parts "Categories"
  const renderCategories = () => (
    <motion.div
      variants={containerVariants}
      className="flex overflow-x-auto md:flex-wrap gap-2 sm:gap-3 md:gap-4 my-3 sm:my-4 md:my-6 pb-2 hide-scrollbar"
    >
      {categories.map((nav, index) => (
        <div
          key={nav}
          variants={categoryVariants}
          custom={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 border border-emerald-700 text-xs sm:text-sm md:text-base text-emerald-700 cursor-pointer whitespace-nowrap ${
                selectedCategory === nav ? "bg-emerald-700 text-white" : ""
              }`
            }
            onClick={() => setSelectedCategory(nav)}
          >
            {nav}
          </NavLink>
        </div>
      ))}
    </motion.div>
  );

  // Render components parts "FilterPanel"
  const renderFilterPanel = () => (
    <AnimatePresence>
      {(isFilterOpen || window.innerWidth >= 768) && (
        <motion.div
          className={`${
            isFilterOpen
              ? "fixed inset-0 z-50 bg-white"
              : "hidden md:block md:w-56 lg:w-64 flex-shrink-0"
          } `}
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
              <span className="font-medium text-base sm:text-lg">Filters</span>
              <div className="flex items-center gap-2">
                <motion.button
                  aria-label="clearFilter"
                  onClick={clearFilters}
                  className="text-gray-400 text-xs sm:text-sm"
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear all
                </motion.button>
                {isFilterOpen && (
                  <motion.button
                    aria-label="Close"
                    onClick={toggleFilter}
                    className="md:hidden text-emerald-700"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                )}
              </div>
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
                      className="bg-emerald-900 text-white px-2 py-1 rounded-full text-xs sm:text-sm"
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
                className="mb-4 sm:mb-6"
                variant={itemVariants}
                custom={index}
              >
                <motion.h3
                  className="uppercase text-[#3F646A] mb-2 text-xs sm:text-sm"
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
                    <label className="text-[#3F646A] cursor-pointer text-xs sm:text-sm">
                      {item}
                    </label>
                  </motion.div>
                ))}
              </motion.div>
            ))}
            {isFilterOpen && (
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f97316" }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFilter}
                aria-label="Apply"
                className="bg-orange-500 text-white px-6 py-2 rounded-md w-full md:block"
              >
                Apply
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render components parts "Product"
  const renderProductCard = (product, index) => (
    <motion.div
      layout
      whileTap="tap"
      custom={index}
      initial="hidden"
      key={product.id}
      animate="visible"
      whileHover="hover"
      variants={productCardVariants}
      exist={{ opacity: 0, scale: 0.8 }}
      className="bg-white rounded-lg p-2 sm:p-3 md:p-4 flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/productpage/${product.id}`} className="flex flex-col h-full">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative mb-2 sm:mb-3 flex-shrink-0"
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-full aspect-square object-contain
                      rounded-lg"
            loading="lazy"
            width="400"
            height="400"
          />
          {product.discount && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute top-2 left-2 bg-pink-500 text-white px-1 sm:px-2 py-0.5 rounded text-xs"
            >
              {product.discount}
            </motion.span>
          )}
          <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}>
            <Heart
              className={`absolute top-2 right-2 ${
                product.favorite ? "text-red-500 fill-red-500" : "text-gray-300"
              } `}
              size={20}
            />
          </motion.div>
        </motion.div>
      </Link>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-medium text-xs sm:text-sm md:text-base mb-1 truncate"
          >
            {product.name}
          </motion.h3>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="block text-xs sm:text-sm text-gray-400 mb-1 truncate"
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
            className="text-orange-500 text-xs sm:text-sm md:text-base font-semibold"
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
            onClick={(e) => handleAddToCart(e, product)}
            className="text-emerald-700 border border-emerald-700 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs whitespace-nowrap"
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-16 sm:pt-20 md:pt-24">
        {/* categories  */}
        {renderCategories()}

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-2 sm:p-4 md:p-6">
          {/* Mobile  filter  toggle*/}
          <motion.div
            variants={itemVariants}
            className="md:hidden flex justify-end mb-2 sm:mb-4"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleFilter}
              className="flex items-center gap-2 bg-emerald-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm"
              aria-label="Toggle Filters"
            >
              <Filter size={16} />
              Filters
            </motion.button>
          </motion.div>

          {/* Filter Sidebar */}
          {renderFilterPanel()}

          {/* Products Sections */}
          <motion.div variants={containerVariants} className="flex-1">
            <motion.div
              variants={itemVariants}
              className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-lg sm:text-xl md:text-2xl font-medium"
              >
                {selectedCategory}
              </motion.h2>
              <motion.select
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border rounded-md py-1 px-2 bg-emerald-700 text-white text-xs sm:text-sm"
                aria-label="Sort products"
              >
                <option value="price">Lowest Price</option>
                <option value="popular">Most Popular</option>
              </motion.select>
            </motion.div>

            <motion.div
              variants={containerVariants}
              animate={controls}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
            >
              <AnimatePresence>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(renderProductCard)
                ) : (
                  <motion.div
                    className="col-span-full text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-gray-500">
                      No products match your filters. Try different criteria.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Category;
