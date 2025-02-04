import "./index.css";
import Layout from "./page/Layout";
import Login from "./Components/Login";
import Category from "./Components/Category";
import HomePage from "./Components/HomePage";
import CartPage from "./Components/CartPage";
import Checkout from "./Components/Checkout";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductPage from "./Components/ProductPage";
import ProtectedRoute from "./Components/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home page Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page Route*/}
        <Route path="/login" element={<Login />} />

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
        <Route path="category" element={<Category />} />
        <Route path="/cartpage/:productId" element={<CartPage />} />
        <Route path="/checkout/:productId" element={<Checkout />} />
        <Route path="/productpage/:productId" element={<ProductPage />} />

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
