import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingCart, ShoppingBasket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isOnline = useOnlineStatus();
  const cartItems = useSelector((state) => state.cart.items);
  const groceryCartItems = useSelector((state) => state.groceryCart.items);
  const totalCartItems = cartItems.length + groceryCartItems.length;

  return (
    <header className="bg-white text-gray-900 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 py-3 md:px-12 lg:px-24">
        {/* Logo */}
        <div className="w-20">
          <Link to="/">
            <img src={LOGO_URL} alt="logo" className="w-full" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-lg items-center list-none">
          <NavItems cartItemsCount={totalCartItems} isOnline={isOnline} />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {/* Grocery Quick Access */}
          <Link to="/grocery">
            <ShoppingBasket className="text-gray-700" />
          </Link>
          {/* Cart Quick Access */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="text-gray-700" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>
          {/* Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Slide-in Panel */}
            <motion.nav
              className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white z-50 shadow-xl px-6 py-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Quick Grocery + Cart buttons inside menu */}
              <div className="flex justify-between mb-6">
                <Link to="/grocery" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500">
                  <ShoppingBasket size={18} /> Grocery
                </Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 relative">
                  <ShoppingCart size={18} />
                  Cart
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalCartItems}
                    </span>
                  )}
                </Link>
              </div>

              <ul className="flex flex-col gap-6 text-base font-medium">
                <NavItems
                  cartItemsCount={totalCartItems}
                  isOnline={isOnline}
                  onClick={() => setMenuOpen(false)}
                />
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavItems = ({ cartItemsCount, isOnline, onClick }) => (
  <>
    <li className="list-none">
      <Link to="/" className="hover:text-orange-500 transition" onClick={onClick}>Home</Link>
    </li>
    <li className="list-none">
      <Link to="/about" className="hover:text-orange-500 transition" onClick={onClick}>About</Link>
    </li>
    <li className="list-none">
      <Link to="/contact" className="hover:text-orange-500 transition" onClick={onClick}>Contact</Link>
    </li>
    <li className="list-none">
      <Link to="/grocery" className="hover:text-orange-500 transition" onClick={onClick}>
        <ShoppingBasket size={16} className="inline mr-1" />
        Grocery
      </Link>
    </li>
    <li className="list-none">
      <Link to="/cart" className="hover:text-orange-500 transition relative" onClick={onClick}>
        <ShoppingCart size={16} className="inline mr-1" />
        Cart ({cartItemsCount})
      </Link>
    </li>
    <li className="list-none">
      <Link to="/login" className="hover:text-orange-500 transition" onClick={onClick}>Login</Link>
    </li>
    <li className="list-none text-sm text-gray-600">{isOnline ? "🟢 Online" : "🔴 Offline"}</li>
  </>
);

export default Header;
