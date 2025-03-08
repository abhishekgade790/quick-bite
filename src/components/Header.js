import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

 const Header = () => {
  const [isLogin, setIsLogin] = useState("Login");
  return (
    <header className="header">
      <div className="logo">
        <img
          src={LOGO_URL}
          alt="logo"
        />
      </div>
      <nav className="nav">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
          <li><button className="login-btn" onClick={()=>{isLogin == "Login" ? setIsLogin("Logout") : setIsLogin("Login")}}>{isLogin}</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

