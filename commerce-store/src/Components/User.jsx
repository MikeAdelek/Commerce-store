import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userItems } from "./ProductDetails";
import Avatar from "../assets/user3.jpg";
import {
  User2,
  Settings,
  Bell,
  ShoppingCart,
  Home,
  Bookmark,
  Heart,
  Camera,
  ArrowLeft,
  Settings2,
  Menu,
  X
} from "lucide-react";

const User = () => {
  const [activeTab, setActiveTab] = useState("Product");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4AA58B] to-[#1C3F35]">
      {/* Top Navigation */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/home" className="text-white flex items-center gap-2">
            <ArrowLeft size={24} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Settings
            className="hidden sm:block text-white cursor-pointer"
            size={24}
          />
          <Bell
            className="hidden sm:block text-white cursor-pointer"
            size={24}
          />
          <button onClick={toggleSidebar} className="sm:hidden text-white">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User2 size={20} className="text-white" />
              <img
                src={Avatar}
                alt="userImg"
                className="w-full rounded-full object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden">
          <div className="bg-[#4AA58B] w-64 h-full p-4 transform transition-transform">
            <ul className="space-y-4">
              {userItems.map((item) => (
                <li
                  key={item}
                  className="text-white cursor-pointer hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setActiveTab(item);
                    setIsSidebarOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Camera Icon Section */}
      <div className="p-4">
        <Camera size={24} className="text-white cursor-pointer" />
        <p className="text-white text-sm mt-1">Add Product Image</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden sm:block w-48">
          <div className="bg-white/10 rounded-lg p-4">
            <ul className="space-y-3">
              {userItems.map((item) => (
                <li
                  key={item}
                  className={`text-white cursor-pointer hover:opacity-100 transition-opacity ${
                    activeTab === item
                      ? "font-medium opacity-100"
                      : "opacity-70"
                  }`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Information */}
        <main className="flex-1">
          <div className="space-y-6">
            <section>
              <h2 className="text-white mb-2">Product Information</h2>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Product Name"
              />
            </section>

            <section>
              <h2 className="text-white mb-2">Description</h2>
              <textarea
                className="w-full p-3 rounded-lg bg-white/90 h-32 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Product Description"
              />
            </section>

            {/* Size Options */}
            <section>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "X", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </section>

            {/* Gender Options */}
            <section>
              <div className="flex flex-wrap gap-2">
                {["Male", "Female", "Unisex"].map((gender) => (
                  <button
                    key={gender}
                    className="px-4 py-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </section>

            {/* Additional Fields */}
            <section className="space-y-3">
              {["Price", "Stock", "Category", "Brand"].map((field) => (
                <input
                  key={field}
                  type="text"
                  className="w-full p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder={field}
                />
              ))}
            </section>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-full sm:w-64">
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg h-48 flex items-center justify-center">
              <Camera className="text-white/50" size={48} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg h-24 flex items-center justify-center"
                >
                  <Camera className="text-white/50" size={24} />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="SKU"
              />
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Tags"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default User;
