import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { newArrivals } from "./ProductDetails";
import { useCart } from "../utils/CartContext";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  cardVariants,
  containerVariants,
  fadeIn,
  buttonVariants
} from "./Animation";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("NEW");
  const { addToCart } = useCart();
  const controls = useAnimation();

  // Trigger Animation when components mounts
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animate category change
  useEffect(() => {
    const animateCategory = async () => {
      await controls.start("hidden");
      await controls.start("visible");
    };

    animateCategory();
  }, [selectedCategory, controls]);

  // Handle add to cart without navigating
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    // Ensure price is a number before adding to cart
    const productToAdd = {
      ...product,
      quantity: 1,
      price: parseFloat(product.price) // Convert price to number
    };

    addToCart(productToAdd);
  };

  return (
    <>
      <motion.div
        variants={fadeIn}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-xl font-semibold">New Arrivals</h2>
        <Link to="/category" className="font-semibold text-base md:text-xl">
          <motion.span
            whileHover={{ x: 5 }}
            whileTap={{ x: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            See More
          </motion.span>
        </Link>
      </motion.div>

      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          animate={controls}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 p-2 md:p-4"
        >
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              whileTap="tap"
              layout
              className="bg-white rounded-lg p-2 sm:p-3 md:p-4 flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/productpage/${product.id}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative mb-2 sm:mb-3 flex-shrink-0"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-72 aspect-square object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                </motion.div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-1 truncate">
                      {product.name}
                    </h3>
                    <span className="block text-xs sm:text-sm text-gray-400 mb-1 truncate">
                      {product.size}
                    </span>
                    <span className="block text-xs sm:text-sm text-gray-400 mb-1 truncate">
                      {product.color}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-between items-center mt-2">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-orange-500 text-xs sm:text-sm md:text-base font-semibold"
                >
                  ₦ {product.price}
                </motion.span>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="button"
                  onClick={(e) => handleAddToCart(e, product)}
                  className="text-emerald-700 border border-emerald-700 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs whitespace-nowrap"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Product;
