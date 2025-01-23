import React from "react";
import { Link, NavLink } from "react-router-dom";
import playStore from "../assets/Android.png";
import appleStore from "../assets/Vector.png";
import { footerSections, socialLinks } from "./ProductDetails";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#4AA58B] to-[#1C3F35]  text-white py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Commerce Section */}
        <div className="mb-4 sm:mb-0">
          <h3 className="font-bold mb-4 text-sm sm:text-base">COMMERCE</h3>
          <div className="space-y-3 flex flex-col">
            {footerSections.COMMERCE.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className="hover:text-gray-200 text-xs sm:text-sm"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 sm:mt-6">
            <h4 className="font-bold mb-2 text-sm sm:text-base">
              CONNECT WITH US
            </h4>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 text-lg sm:text-xl"
                  aria-label={`Social link ${index + 1}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-4 sm:mb-0">
          <h3 className="font-bold mb-4 text-sm sm:text-base">ABOUT</h3>
          <Link className="space-y-3 flex flex-col">
            {footerSections.ABOUT.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className="hover:text-gray-200 text-xs sm:text-sm"
              >
                {item.name}
              </NavLink>
            ))}
          </Link>
        </div>

        {/* Resources Section */}
        <div className="mb-4 sm:mb-0">
          <h3 className="font-bold mb-4 text-sm sm:text-base">RESOURCES</h3>
          <Link className="space-y-3 flex flex-col">
            {footerSections.RESOURCES.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className="hover:text-gray-200 text-xs sm:text-sm"
              >
                {item.name}
              </NavLink>
            ))}
          </Link>
        </div>

        {/* Payment Section */}
        <div className="mb-4 sm:mb-0">
          <h3 className="font-bold mb-4 text-sm sm:text-base">PAYMENT</h3>
          <Link className="space-y-3 flex flex-col">
            {footerSections.PAYMENT.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className="hover:text-gray-200 text-xs sm:text-sm"
              >
                {item.name}
              </NavLink>
            ))}
          </Link>
        </div>

        {/* Newsletter Section */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
          <h3 className="font-bold mb-4 text-sm sm:text-base">OUR APPS</h3>
          <div className="space-y-2">
            <a
              href="#"
              className="bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800 flex items-center space-x-2"
            >
              <img
                src={playStore}
                alt="Get it on Play Store"
                className="w-6 h-6"
              />
              <span className="text-xs sm:text-sm">Google Play Store</span>
            </a>
            <a
              href="#"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center space-x-2"
            >
              <img
                src={appleStore}
                alt="Download on App Store"
                className="w-6 h-6"
              />
              <span className="text-xs sm:text-sm">Apple Store</span>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-600 h-[1px] mt-6 sm:mt-8"></div>
      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm">
        <p className="text-black">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
