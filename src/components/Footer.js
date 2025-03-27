import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-900 py-6 px-6 shadow-md mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-lg">© 2025 Your Company. All rights reserved.</p>
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-orange-500 transition">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-orange-500 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-orange-500 transition">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
