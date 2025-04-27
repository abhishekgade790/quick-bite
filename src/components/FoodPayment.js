import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearItems } from "../store/cartSlice";

const FoodPayment = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

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
      navigate("/");
      dispatch(clearItems());
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md min-h-[80vh]">
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
          {/* Address Input */}
          <div className="flex flex-col mt-8">
            <label className="text-lg font-semibold mb-2">
              Delivery Address:
            </label>
            <textarea
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows="3"
              placeholder="Enter your full address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          {/* Bill Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Bill Summary</h2>

            {/* Item List */}
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.card.info.id}
                  className="flex justify-between items-center text-gray-700"
                >
                  <span className="font-medium">
                    {item.card.info.name} × {item.quantity}
                  </span>
                  <span>
                    ₹
                    {(
                      ((item.card.info.price || item.card.info.defaultPrice) /
                        100) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotal, Tax, Total */}
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
