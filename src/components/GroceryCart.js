import { useSelector, useDispatch } from "react-redux";
import {
  incrementGroceryQuantity,
  decrementGroceryQuantity,
  removeGroceryItem,
  clearGroceryItems,
} from "../store/groceryCartSlice";
import { Link } from "react-router-dom";

const GroceryCart = () => {
  const cartItems = useSelector((state) => state.groceryCart.items);
  const dispatch = useDispatch();
  const subTotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const tax = subTotal * 0.1;
  const totalAmount = subTotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="h-100 flex flex-col items-center justify-center py-20 text-center space-y-6 text-gray-600">
        <div className="text-2xl">🛒 Your grocery cart is empty.</div>
        <Link
          to="/grocery-shop"
          className="bg-green-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-700 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-8 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        Grocery Cart
      </h1>

      <div className="space-y-3 bg-gray-100 rounded-xl shadow-sm p-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-200 py-2"
          >
            {/* Item Info */}
            <div className="flex items-center space-x-4 w-2/3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h2 className="font-medium">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2 border-2 border-gray-300 text-green-600 rounded-lg">
              <button
                onClick={() =>
                  item.quantity === 1
                    ? dispatch(removeGroceryItem(item.id))
                    : dispatch(decrementGroceryQuantity(item.id))
                }
                className="px-3 font-bold text-2xl"
              >
                -
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                onClick={() => dispatch(incrementGroceryQuantity(item.id))}
                className="px-3 font-bold text-2xl"
              >
                +
              </button>
            </div>

            {/* Price */}
            <div className="text-gray-700 font-medium text-right min-w-[80px]">
              ₹
              {(
                parseFloat(item.price.replace(/[^\d.]/g, "")) * item.quantity
              ).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Bill Summary */}
        <div className="mt-8 p-4 border-t-2 border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Bill Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium">Subtotal:</span>
            <span className="text-lg">₹{subTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium">Tax (10%):</span>
            <span className="text-lg">₹{tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-4 border-t-2 pt-4">
            <span className="text-xl font-bold">Total Amount:</span>
            <span className="text-xl font-bold text-green-600">
              ₹{totalAmount.toFixed(2)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <button className="w-full sm:w-1/2 bg-green-600 text-white py-2 rounded-lg text-lg hover:bg-green-700 transition">
              Proceed to Checkout
            </button>
            <button
              onClick={() => dispatch(clearGroceryItems())}
              className="w-full sm:w-1/2 bg-red-500 text-white py-2 rounded-lg text-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryCart;
