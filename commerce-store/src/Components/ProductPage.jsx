import React, { useState, useEffect } from "react";
import { newArrivals, trending, categoryProducts } from "./ProductDetails";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../utils/CartContext";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast"; // added for notification
import { containerVariants, itemVariants } from "./Animation";
import { ContainerIcon } from "lucide-react";

const ProductPage = () => {
  const { addToCart } = useCart();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    // product search logic
    const allProducts = [...newArrivals, ...trending, ...categoryProducts];
    const foundProduct = allProducts.find((p) => p.id === parseInt(productId));

    setProduct(foundProduct);
    setLoading(false);

    // Reset Selection when product is selected
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);
  }, [productId]);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent any default navigation

    // add validation for size and color if available
    if (product.size && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    addToCart({ ...product, quantity, selectedSize, selectedColor }); // show a noification that item was added
    toast.success(`${product.name} added to cart`); // show a success notification that item was added
  };

  const handleViewCart = () => {
    navigate("/cart"); // add a seperate button if you want to navigate to cart
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-emerald-700 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl mb-4">Product not found</p>
        <Link
          to="/"
          className="text-emerald-700 hover:underline mt-4 inline-block px-6 py-2 border border-emerald-700 rounded-lg transition-colors hover:bg-emerald-50"
        >
          Back to Home
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16"
    >
      {/* Breadcrumb */}
      <motion.div variants={itemVariants}>
        <Link
          to="/"
          className="flex items-center mb-6 text-gray-600 hover:text-emerald-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Back to Products</span>
        </Link>
      </motion.div>

      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <motion.div variants={itemVariants} className="mb-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="overflow-hidden rounded-lg shadow-lg"
          >
            <motion.img
              src={product.img}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          variants={containerVariants}
          className="flex flex-cols flex-wrap sm:flex-row gap-2 md:gap-4"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold mb-2"
          >
            {product.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl text-emerald-700 font-bold mb-2"
          >
            ₦{product.price.toFixed(2)}
          </motion.p>

          {product.size && (
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4 mb-2"
            >
              <h3 className="text-lg font-medium">Select Size:</h3>
              <div className="flex flex-wrap gap-1">
                {product.size
                  .replace("Size:", "")
                  .trim()
                  .split(" ")
                  .map((size, index) => (
                    <motion.div
                      key={index}
                      className={`border px-4 py-1.5 rounded-md cursor-pointer transition-colors ${
                        selectedSize === size
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "border-gray-300 hover:border-emerald-700"
                      }`}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

          {product.color && (
            <motion.div
              variants={itemVariants}
              className="mb-2 flex items-center space-x-4"
            >
              <h3 className="text-lg font-medium">Select Color</h3>
              <div className="flex flex-wrap gap-1">
                {product.color
                  .replace("color:", "")
                  .trim()
                  .split(" ")
                  .map((color, index) => (
                    <motion.div
                      key={index}
                      className={`border px-4 py-1.5 rounded-md cursor-pointer transition-colors ${
                        selectedColor === color
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "border-gray-300 hover:border-emerald-700"
                      }`}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="mt-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <motion.button
                  className="px-2 py-1 bg-gray-100 text-base"
                  onClick={handleDecreaseQuantity}
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.95 }}
                >
                  -
                </motion.button>
                <span className="px-2 py-1 text-center min-w-[30px]">
                  {quantity}
                </span>
                <motion.button
                  className="px-2 py-1 bg-gray-100 text-base"
                  onClick={handleIncreaseQuantity}
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.95 }}
                >
                  +
                </motion.button>
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-6"
            >
              <motion.button
                className="flex-1 bg-emerald-700 text-white py-1 px-2 rounded-lg font-medium"
                onClick={handleAddToCart}
                whileHover={{ backgroundColor: "#065f46", scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Add to Cart
              </motion.button>
              <motion.button
                className="flex-1 border border-emerald-700 text-emerald-700 py-1 px-3 rounded-lg font-medium"
                whileHover={{ backgroundColor: "#ecfdf5", scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Add to Wishlist {product.favorite && "❤️"}
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 p-6 bg-gray-50 rounded-lg"
          >
            <h3 className="text-lg font-medium mb-3">Product Details</h3>
            <p className="text-gray-700 font-medium">
              Category: <span className="font-normal">{product.category}</span>
            </p>
            <p className="text-gray-700 mt-3 leading-relaxed">
              This {product.name} is part of our Elite collection. Perfect for
              everyday use with premium quality materials.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
