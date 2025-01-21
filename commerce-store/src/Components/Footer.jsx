import React from "react";
import { Link, NavLink } from "react-router-dom";
import { footerSections, socialLinks } from "./ProductDetails";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#4AA58B] to-[#1C3F35]  text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Commerce Section */}
        <div>
          <h3 className="font-bold mb-8">COMMERCE</h3>
          <div className="space-y-8 flex flex-col">
            {footerSections.COMMERCE.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className="hover:text-gray-200"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="font-bold mb-4">CONNECT WITH US</h4>
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200"
                  aria-label={`Social link ${index + 1}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-bold mb-8">ABOUT</h3>
          <Link className="space-y-8 flex flex-col">
            {footerSections.ABOUT.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className="hover:text-gray-200"
              >
                {item.name}
              </NavLink>
            ))}
          </Link>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="font-bold mb-8">RESOURCES</h3>
          <Link className="space-y-8 flex flex-col">
            {footerSections.RESOURCES.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className="hover:text-gray-200"
              >
                {item.name}
              </NavLink>
            ))}
          </Link>
        </div>

        {/* Payment Section */}
        <div>
          <h3 className="font-bold mb-8">PAYMENT</h3>
          <Link className="space-y-8 flex flex-col">
            {footerSections.PAYMENT.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className="hover:text-gray-200"
              >
                {item.name}
              </NavLink>
            ))}
          </Link>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="font-bold mb-4">OUR APPS</h3>
          <div className="space-y-2">
            <a
              href="#"
              className="block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              <img
                src="/api/placeholder/120/40"
                alt="Get it on Play Store"
                className="w-30"
              />
            </a>
            <a
              href="#"
              className="block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              <img
                src="/api/placeholder/120/40"
                alt="Download on App Store"
                className="w-30"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
