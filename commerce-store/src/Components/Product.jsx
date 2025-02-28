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
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 p-2 md:p-4"
        >
          {newArrivals.map((product, index) => (
            <motion.a
              href={`/productpage/${product.id}`}
              key={product.id}
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              whileTap="tap"
              layout
              className="bg-white rounded-lg p-2 sm:p-4 flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative mb-2 sm:mb-4 flex-shrink-0"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-72 object-cover rounded-lg mb-4"
                />
              </motion.div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 truncate">
                    {product.name}
                  </h3>
                  <span className="block text-sm sm:text-base text-gray-400 mb-2">
                    {product.size}
                  </span>
                  <span className="block text-sm sm:text-base text-gray-400 mb-2">
                    {product.color}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-orange-500 text-sm sm:text-base font-semibold"
                  >
                    ₦ {product.price}
                  </motion.span>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={() => addToCart(product)}
                    className="-emerald-700 border border-emerald-700 px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Product;
