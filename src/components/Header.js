import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [isLogin, setIsLogin] = useState("Login");
  const isOnline = useOnlineStatus();
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="link">
          <img src={LOGO_URL} alt="logo" />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/grocery" className="link">
              Grocery
            </Link>
          </li>
          <li>
            <button
              className="login-btn"
              onClick={() => {
                isLogin === "Login"
                  ? setIsLogin("Logout")
                  : setIsLogin("Login");
              }}
            >
              {isLogin}
            </button>
          </li>
          <li>{isOnline ? "🟢" : "🔴"}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
