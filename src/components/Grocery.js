import React from "react";
import { useNavigate } from "react-router-dom";

const Grocery = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white p-6 sm:p-10 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 text-center mb-4">
          🛒 Online Grocery Store
        </h1>
        <p className="text-base sm:text-lg text-gray-700 text-center mb-6">
          Get fresh groceries delivered to your doorstep at the best prices!
          Explore a wide range of fruits, vegetables, dairy, snacks, and more.
        </p>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {[
            {
              title: "🍏 Fresh Fruits",
              items: "Apples, Bananas, Oranges, Mangoes...",
            },
            {
              title: "🥦 Vegetables",
              items: "Tomatoes, Potatoes, Spinach, Carrots...",
            },
            {
              title: "🥛 Dairy Products",
              items: "Milk, Cheese, Butter, Yogurt...",
            },
            {
              title: "🍞 Bakery & Snacks",
              items: "Bread, Biscuits, Cakes, Chips...",
            },
            {
              title: "🥫 Pantry Essentials",
              items: "Rice, Pulses, Oil, Spices...",
            },
            {
              title: "🍫 Beverages",
              items: "Juices, Tea, Coffee, Cold Drinks...",
            },
          ].map((category, idx) => (
            <div
              key={idx}
              className="bg-green-50 p-5 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-1">
                {category.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {category.items}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <button
            className="bg-green-500 text-white px-6 py-3 text-base sm:text-lg rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
            onClick={() => navigate("/grocery-shop")}
          >
            Shop Now 🛍️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grocery;
