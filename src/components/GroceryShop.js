import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGroceryItem,
  incrementGroceryQuantity,
  decrementGroceryQuantity,
} from "../store/groceryCartSlice";
import { groceryItems } from "../utils/groceryItems";
import toast from "react-hot-toast";

const GroceryShop = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.groceryCart.items);

  const handleAddToCart = (item) => {
    dispatch(addGroceryItem({ ...item, quantity: 1 }));
    toast.success(`${item.name} added to cart!`);
  };

  const handleIncrement = (id) => {
    dispatch(incrementGroceryQuantity(id));
    const item = groceryItems.find((i) => i.id === id);
    toast.success(`Increased ${item.name} quantity`);
  };

  const handleDecrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item.quantity === 1) {
      toast.error(`${item.name} removed from cart`);
    } else {
      toast.success(`Decreased ${item.name} quantity`);
    }
    dispatch(decrementGroceryQuantity(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Grocery Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {groceryItems.map((item) => {
          const isItemInCart = cartItems.some(
            (cartItem) => cartItem.id === item.id
          );
          const itemInCart = cartItems.find(
            (cartItem) => cartItem.id === item.id
          );

          return (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2 text-green-800">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-md font-bold text-gray-800 mt-1">
                {item.price}
              </p>

              {!isItemInCart ? (
                <button
                  className="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-between mt-3 bg-gradient-to-r from-green-400 to-green-600 rounded-sm overflow-hidden w-full max-w-[250px] mx-auto shadow-lg">
                  <button
                    className="flex-1 text-white text-2xl font-bold py-1 hover:bg-green-700 transition-all"
                    onClick={() => handleDecrement(item.id)}
                  >
                    –
                  </button>
                  <div className="flex-1 text-center bg-white text-green-700 font-bold text-lg py-1">
                    {itemInCart.quantity}
                  </div>
                  <button
                    className="flex-1 text-white text-2xl font-bold py-1 hover:bg-green-700 transition-all"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroceryShop;
