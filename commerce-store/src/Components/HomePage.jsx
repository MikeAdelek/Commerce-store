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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
    >
      <motion.div
        variants={containerVariants}
        className="flex gap-8 my-4 sm:my-6 flex-wrap"
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
              onClick={() => setSelectedCategory(nav)}
              className={`rounded-lg px-4 py-2 border border-emerald-700 text-sm sm:text-base text-emerald-700 cursor-pointer ${
                selectedCategory === nav ? "bg-emerald-700 text-white" : ""
              }`}
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
