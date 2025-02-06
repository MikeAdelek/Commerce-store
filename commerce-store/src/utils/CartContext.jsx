import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);
const CartContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const signIn = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const signUp = async (userData) => {
    setIsAuthenticated(false);
    setUser(userData);

    const newUser = {
      id: Date.now(),
      email: userData.email,
      name: userData.name,
      createdAt: new Date().toISOString()
    };

    // store this in local storage
    localStorage.setItem(user, JSON.stringify(newUser));

    setIsAuthenticated(true);
    setUser(newUser);
    return newUser;
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = { isAuthenticated, user, signIn, signUp, logOut };
  return React.createElement(AuthContext.Provider, { value }, children);
};
export { AuthContext };

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // const [showCart, setShowCart] = useState(false);

  const addToCart = (product, trending, newArrivals) => {
    setCartItems((prevItems) => {
      // check if the item already exist in the cart
      const existingItem = prevItems.find(
        (item) => item.id === product.id || trending.id || newArrivals.id
      );

      if (existingItem) {
        // If item exists, increment quantity
        return prevItems.map((item) =>
          item.id === product.id || trending.id || newArrivals.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // if items does not exists, add it with quantity 1
      return [
        ...prevItems,
        { ...product, ...trending, ...newArrivals, quantity: 1 }
      ];
    });
  };

  const removeFromCart = (productId, trendingId, newArrivalsId) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== productId || trendingId,
        newArrivalsId
      )
    );
  };

  const updateQuantity = (
    productId,
    trendingId,
    newArrivalsId,
    newQuantity
  ) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId || trendingId || newArrivalsId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return React.createElement(CartContext.Provider, { value }, children);
};

export { CartContext };
