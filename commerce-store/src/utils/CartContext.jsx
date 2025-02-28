import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
const CartContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check if user is logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Check if user is authenticated from local storage or JWT token
      // If authenticated, set user and isAuthenticated state
      // If not, clear local storage and isAuthenticated state
      try {
        const token = localStorage.getItem("authToken");

        if (token) {
          // validate the token with backend here
          // for demo, set user has authenticated

          // Get user data from storage or decode from JWT
          const userData = JSON.parse(localStorage.getItem("userData") || `{}`);

          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // clear potentially expired token
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // signIn function
  const signIn = async (email, password) => {
    try {
      // call your authentication API here
      // for demo purposes, we'll simulate a successful login

      // simulate API response
      const response = {
        token: "fake-jwt-token",
        user: {
          id: "123",
          name: "Jane Doe",
          email: email
        }
      };

      // store auth data
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userData", JSON.stringify(response.user));

      // update state
      setUser(response.user);
      setIsAuthenticated(true);

      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Failed to Login, Please try again"
      };
    }
  };

  // signOut function
  const signOut = () => {
    // clear auth data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // update state
    setUser(null);
    setIsAuthenticated(false);
  };

  // register function
  const register = async (name, email, password) => {
    try {
      // call your registration API here
      // for demo purposes, we'll simulate a successful registration

      // after registration log user in
      const loginResult = await signIn(email, password);
      return loginResult;
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.message || "Failed to Register, Please try again"
      };
    }
  };

  const value = {
    isAuthenticated,
    loading,
    user,
    login: signIn,
    LogOut: signOut,
    register
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // ensure all items have a numeric price
        const fixedCart = parsedCart.map((item) => ({
          ...item,
          price: parseFloat(item.price) || 0
        }));
        setCartItems(fixedCart);
      } catch (error) {
        console.error("Error parsing Cart:", error);
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // check if the item already exists in the cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, increment quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      // if item does not exist, add it
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext };
