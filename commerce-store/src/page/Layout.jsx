import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { CartProvider, AuthProvider } from "../utils/CartContext";
import Login from "../Components/Login";

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {/* <div className="flex flex-col min-h-screen"></div> */}
        <Header />
        <main>
          <Outlet />
          {children}
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default Layout;
