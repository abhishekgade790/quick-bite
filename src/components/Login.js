import React, { useState } from "react";
import { login } from "../store/loginStatusSlice";
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        {isLogin ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-orange-600 mb-4">
              Welcome back, {user.username}!
            </h1>
            <p className="text-gray-600">You're already logged in.</p>
            <button className="bg-orange-500 m-4 py-1 px-4 text-white rounded-lg hover:bg-orange-600 cursor-pointer" onClick={()=>{navigate("/")}}>HOME</button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center text-orange-600">
              {isLoginMode ? "Login to Your Account" : "Create an Account"}
            </h2>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {!isLoginMode && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                />
              )}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                onClick={handleAuth}
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-all"
              >
                {isLoginMode ? "Login" : "Sign Up"}
              </button>
            </div>

            <p
              className="text-sm text-center mt-4 text-gray-600 cursor-pointer hover:underline"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError("");
              }}
            >
              {isLoginMode
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
