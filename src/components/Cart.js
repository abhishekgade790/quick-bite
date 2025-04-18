import React, { useState } from 'react';
import FoodCart from './FoodCart';
import GroceryCart from './GroceryCart';

const Cart = () => {
  const [activeTab, setActiveTab] = useState("food"); // default tab

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === "food"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("food")}
        >
          Food Cart
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === "grocery"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("grocery")}
        >
          Grocery Cart
        </button>
      </div>

      {/* Conditional Render */}
      {activeTab === "food" ? <FoodCart /> : <GroceryCart />}
    </div>
  );
};

export default Cart;
