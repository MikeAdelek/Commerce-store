import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { useCart } from "../utils/CartContext";
import { motion } from "framer-motion";
import { trending } from "./ProductDetails";
import {
  cardVariants,
  containerVariants,
  fadeIn,
  buttonVariants
} from "./Animation";

const TrendingProduct = () => {
  const { addToCart } = useCart();
  return (
    <>
      {/* Trending */}
      <motion.div
        variants={fadeIn}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-xl font-semibold">Trending...</h2>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="font-semibold text-base md:text-xl"
        >
          <ArrowRightIcon size={24} />
        </motion.button>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-2 md:p-4"
      >
        {trending.map((product, index) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            custom={index}
            whileHover="hover"
            whileTap="tap"
            className="bg-white rounded-lg p-4 sm:p-8 flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/productpage/${product.id}`}>
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
              </div>
            </Link>
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
                className="text-emerald-700 border border-emerald-700 px-2 py-1 rounded text-xs sm:text-sm"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default TrendingProduct;
