import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearGroceryItems } from "../store/groceryCartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const GroceryPayment = () => {
  const cartItems = useSelector((state) => state.groceryCart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const subTotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const tax = subTotal * 0.1;
  const totalAmount = subTotal + tax;

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address! 🚚");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty! Cannot place order.");
      navigate("/grocery-shop");
      return;
    }

    toast.success("Order placed successfully! 🎉");

    setTimeout(() => {
      dispatch(clearGroceryItems());
      navigate("/grocery-shop");
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Grocery Payment
      </h1>

      <div className="space-y-6">
        {/* Address Input */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Delivery Address:</label>
          <textarea
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="3"
            placeholder="Enter your full address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Bill Summary</h2>

          {/* List of Items */}
          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-gray-700">
                <span className="font-medium">
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹{(parseFloat(item.price.replace(/[^\d.]/g, "")) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between py-2 border-t pt-2">
            <span className="text-gray-700 font-medium">Subtotal:</span>
            <span>₹{subTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-medium">Tax (10%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-4 border-t mt-4">
            <span className="text-xl font-bold">Total Amount:</span>
            <span className="text-xl font-bold text-green-600">
              ₹{totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg text-lg font-semibold"
        >
          Place Order
        </button>

        {/* Back to Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 transition text-gray-700 py-3 rounded-lg text-lg font-semibold"
        >
          Back to Cart
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default GroceryPayment;
