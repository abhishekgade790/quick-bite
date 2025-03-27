import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  const [isLogin, setIsLogin] = useState("Login");
  const isOnline = useOnlineStatus();

  const cartItems = useSelector((state)=> state.cart.items);

  return (
    <header className="flex justify-between items-center bg- text-gray-900 lg:px-24 md:px-12 shadow-md ">
      <div className="w-20">
        <Link to="/">
          <img src={LOGO_URL} alt="logo" className="w-full" />
        </Link>
      </div>
      <nav>
        <ul className="flex gap-6 text-lg">
          <li>
            <Link to="/" className="hover:text-orange-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/grocery" className="hover:text-orange-500 transition">
              Grocery
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-orange-500 transition">
              Cart ({cartItems.length})
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-orange-500 transition">
              Login
            </Link>
          </li>
          <li className="text-md">{isOnline ? "🟢" : "🔴"}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
