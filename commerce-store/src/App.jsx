import "./index.css";
import Login from "./Admin/Login";
import Layout from "./page/Layout";
import User from "./Components/User";
import SignUpPage from "./Admin/SignUp";
import Category from "./Components/Category";
import HomePage from "./Components/HomePage";
import CartPage from "./Components/CartPage";
import Checkout from "./Components/Checkout";
import ProductPage from "./Components/ProductPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Sign Up page Route */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Login page Route*/}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected route for checkout page */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* other route */}
        {/* Add checkout success route */}
        {/* <Route
          path="/checkout-success"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-emerald-700 mb-4">
                  Order Confirmed!
                </h1>
                <p className="text-gray-600 mb-4">
                  Thank you for your purchase. You will receive a confirmation
                  shortly.
                </p>
                <button
                  onClick={() => (window.location.href = "/home")}
                  className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          }
        /> */}

        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/user" element={<User />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cartpage/:productId" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/productpage/:productId" element={<ProductPage />} />
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Add a catch-all route for 404 errors */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
