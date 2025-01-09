import Category from "./Components/Category";
import ProductPage from "./Components/ProductPage";
// import OrderSummary from "./Components/OrderSummary";
import CartPage from "./Components/CartPage";
import Checkout from "./Components/Checkout";
import Layout from "./page/Layout";

import { Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home page Route */}
        <Route
          path="/"
          element={
            <>
              {/* <Home /> */}
              <Category />
            </>
          }
        />

        {/* other route */}
        <Route path="/productpage/:productId" element={<ProductPage />} />
        <Route path="/cartpage/:productId" element={<CartPage />} />
        <Route path="/checkout/:productId" element={<Checkout />} />
        {/* <Route path="/ordersummary/:product" element={<OrderSummary />} /> */}

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
