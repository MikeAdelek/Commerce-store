import React from "react";
import { Link, NavLink } from "react-router-dom";
import {footerSections, socialLinks} from './ProductDetails'

const Footer = () => {
  return (
    <footer className="bg-emerald-600 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Commerce Section */}
        <div>
          <h3 className="font-bold mb-4">COMMERCE</h3>
          <Link></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
