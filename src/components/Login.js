import React, { useState } from "react";
import { login, logout } from "../store/loginStatusSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.loginStatus);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isLoginMode) {
      if (username === "admin" && password === "admin") {
        dispatch(login({ username }));
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } else {
      if (!username || !password || !confirmPassword) {
        setError("All fields are required");
      } else if (password !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        dispatch(login({ username }));
        navigate("/");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-300 px-4">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-md p-8 sm:p-10 transition-all duration-300">
        {isLogin ? (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-orange-600">
              Welcome back, {user.username}!
            </h1>
            <p className="text-gray-600 text-lg">You're already logged in.</p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full text-lg shadow-md transition-all cursor-pointer"
              >
                Go to Home
              </button>

              <button
                onClick={handleLogout}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full text-lg shadow-md transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center text-orange-600">
              {isLoginMode ? "Login to Quick Bite" : "Create an Account"}
            </h2>

            <div className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-none"
              />
              {!isLoginMode && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-orange-400 focus:outline-none "
                />
              )}

              {error && (
                <p className="text-red-500 text-center text-sm font-medium">
                  {error}
                </p>
              )}

              <button
                onClick={handleAuth}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full text-lg font-semibold transition-all shadow-md cursor-pointer"
              >
                {isLoginMode ? "Login" : "Sign Up"}
              </button>
            </div>

            <p
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError("");
              }}
              className="text-center text-sm text-gray-700 mt-6 cursor-pointer hover:underline"
            >
              {isLoginMode
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
