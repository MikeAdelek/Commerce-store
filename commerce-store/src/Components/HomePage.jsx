import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { homeCategory } from "./ProductDetails";
import ImageCarousel from "./ImageCarousel";
import { motion } from "framer-motion";
import Product from "./Product";

import TrendingProduct from "./TrendingProduct";
import { containerVariants, fadeIn } from "./Animation";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("NEW");

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-2 sm:px-4 pt-16 sm:pt-20 md:pt-24"
    >
      <motion.div
        variants={containerVariants}
        className="flex overflow-x-auto md:flex-wrap gap-2 sm:gap-3 md:gap-4 my-3 sm:my-4 md:my-6 pb-2 hide-scrollbar"
      >
        {/* Home Page Categories */}
        {homeCategory.map((nav, index) => (
          <motion.div
            variants={fadeIn}
            custom={index}
            whileHover="hover"
            whileTap="tap"
            key={nav}
          >
            <NavLink
              to="/category"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 border border-emerald-700 text-xs sm:text-sm md:text-base text-emerald-700 cursor-pointer whitespace-nowrap ${
                  selectedCategory === nav ? "bg-emerald-700 text-white" : ""
                }`
              }
              onClick={() => setSelectedCategory(nav)}
            >
              {nav}
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Image Carousel */}
      <motion.div
        variants={fadeIn}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <ImageCarousel />
      </motion.div>

      {/* New Arrivals */}
      <motion.div variants={containerVariants} className="my-8 p-12 sm:p-8">
        <Product />
      </motion.div>

      {/* Trending */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="my-8 p-12 sm:p-8"
      >
        <TrendingProduct />
      </motion.div>
    </motion.section>
  );
};

export default HomePage;
