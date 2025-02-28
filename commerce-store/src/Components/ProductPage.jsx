import React, { useState, useEffect } from "react";
import { newArrivals, trending, categoryProducts } from "./ProductDetails";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../utils/CartContext";

const ProductPage = () => {
  const { addToCart } = useCart();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // find product from newArrivals based on the Id
    const foundProduct =
      newArrivals &&
      trending &&
      categoryProducts.find((p) => p.id === parseInt(productId));
    setProduct(foundProduct);
    setLoading(false);
  }, [productId]);

  const handleDecreaseQuantity = () => {
    if (quantity < 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  if (!product) {
    return (
      <div className="text-center py-12">
        <p>Product not found</p>
        <Link
          to="/"
          className="text-emerald-700 hover:underline mt-4 inline-block"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
      {/* ProductPage */}
      <Link to="/" className="flex items-center mb-6">
        <h1 className="text-gray-600 text-base">Product</h1>
      </Link>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="mb-6">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-72 object-contain rounded-lg mb-4"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-emerald-700 font-bold mb-2">
            ₦{product.price.toFixed(2)}
          </p>

          {product.size && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.size
                  .replace("Size:", "")
                  .trim()
                  .split(" ")
                  .map((size, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 px-3 py-1 rounded-md hover:border-emerald-700 cursor-pointer"
                    >
                      {size}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {product.color && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {product.color
                  .replace("color:", "")
                  .trim()
                  .split(" ")
                  .map((color, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 px-3 py-1 rounded-md hover:border-emerald-700 cursor-pointer"
                    >
                      {color}
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-3 py-1 bg-gray-100 text-lg"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className="px-4 py-1 ">{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-100 text-lg"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="w-full bg-emerald-700 text-white py-3 px-6 rounded-lg hover:bg-emerald-800 transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="w-full border border-emerald-700 text-emerald-700 py-3 px-6 rounded-lg hover:bg-emerald-50 transition-colors">
              Add to Wishlist {product.favorite && "❤️"}
            </button>
          </div>

          <div className="mt-8 mb-4">
            <h3 className="text-lg font-medium mb-2">Product Details</h3>
            <p className="text-gray-700">Category : {product.category}</p>
            <p className="text-gray-700 mt-2">
              This {product.name} is part of our Elite collection. Perfect for
              everyday use with premium quality materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
