import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodPayment = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [address, setAddress] = useState(""); // State for storing the address

  const subTotal = cartItems.reduce((total, item) => {
    const price = item.card.info.price
      ? (item.card.info.price / 100) * item.quantity
      : (item.card.info.defaultPrice / 100) * item.quantity;
    return total + price;
  }, 0);

  const tax = subTotal * 0.1;
  const totalAmount = subTotal + tax;

  const handlePayment = () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address! 🚚");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty! Cannot proceed with payment.");
      navigate("/");
      return;
    }

    toast.success("Payment Successful! 🎉");

    setTimeout(() => {
      navigate("/"); // After payment, go back to home page
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 px-8 py-10 bg-white rounded-xl shadow-md min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">
        Payment Summary
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 space-y-6">
          <p className="text-lg">No items to pay for!</p>
          <button
            onClick={() => navigate("/")}
            className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-orange-600 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Item List */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.card.info.id}
                className="flex justify-between border-b pb-2"
              >
                <span className="font-medium">{item.card.info.name}</span>
                <span className="font-semibold">
                  ₹
                  {(
                    (item.card.info.price || item.card.info.defaultPrice) /
                      100 *
                      item.quantity
                  ).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Address Input */}
          <div className="flex flex-col mt-8">
            <label className="text-lg font-semibold mb-2">Delivery Address:</label>
            <textarea
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows="3"
              placeholder="Enter your full address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          {/* Bill Details */}
          <div className="mt-8 border-t-2 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-lg">Subtotal:</span>
              <span className="text-lg font-medium">₹{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg">Tax (10%):</span>
              <span className="text-lg font-medium">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-xl font-bold">Total Amount:</span>
              <span className="text-xl font-bold text-green-600">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <div className="mt-6">
            <button
              onClick={handlePayment}
              className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg hover:bg-orange-600 transition"
            >
              Pay ₹{totalAmount.toFixed(2)}
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

export default FoodPayment;
