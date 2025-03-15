import React, { useState } from "react";
import { Navigate } from "react-router-dom";

// Login page
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            setIsLoggedIn(true);
            setIsLoginSuccess(true);
            setIsLoginFailed(false);
        } else {
            setError("Invalid credentials");
            setIsLoginFailed(true);
            setIsLoginSuccess(false);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            {isLoginFailed && <p style={{ color: "red" }}>{error}</p>}
            {isLoginSuccess && <p style={{ color: "green" }}>Login successful</p>}
        </div>
    );
};

export default Login;