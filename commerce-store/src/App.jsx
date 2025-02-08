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

        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/user" element={<User />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cartpage/:productId" element={<CartPage />} />
        <Route path="/checkout/:productId" element={<Checkout />} />
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
