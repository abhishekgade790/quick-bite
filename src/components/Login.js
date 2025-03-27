import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle Login & Signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showInputs, setShowInputs] = useState(false);

  const handleEnter = () => {
    setShowInputs(true);
  };

  const handleAuth = () => {
    if (isLogin) {
      // Login logic
      if (username === "admin" && password === "admin") {
        setIsAuthenticated(true);
      } else {
        setError("Invalid username or password");
      }
    } else {
      // Signup logic
      if (!username || !password || !confirmPassword) {
        setError("All fields are required");
      } else if (password !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        setIsAuthenticated(true);
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-orange-600">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        {!showInputs ? (
          <button
            className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all"
            onClick={handleEnter}
          >
            Enter
          </button>
        ) : (
          <>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <button
              className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all"
              onClick={handleAuth}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p
              className="text-center text-sm text-gray-600 mt-4 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
