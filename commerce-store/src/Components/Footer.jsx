import React from "react";
import { Link, NavLink } from "react-router-dom";
import { footerSections, socialLinks } from "./ProductDetails";

const Footer = () => {
  return (
    <footer className="bg-emerald-600 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Commerce Section */}
        <div>
          <h3 className="font-bold mb-4">COMMERCE</h3>
          <Link className="space-y-2">
            {footerSections.COMMERCE.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className="hover:text-gray-200"
              >
                {item.name}
              </NavLink>
            ))}
          </Link>

          <div className="mt-4">
            <h4 className="font-bold mb-2">CONNECT WITH US</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200"
                  aria-label={`Social link ${index + 1}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
