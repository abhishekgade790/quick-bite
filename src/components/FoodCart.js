import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeItem, clearItems } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";  // <-- Import toast
import "react-toastify/dist/ReactToastify.css";

const FoodCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subTotal = cartItems.reduce((total, item) => {
    const price = item.card.info.price
      ? (item.card.info.price / 100) * item.quantity
      : (item.card.info.defaultPrice / 100) * item.quantity;
    return total + price;
  }, 0);

  const tax = subTotal * 0.1;
  const totalAmount = subTotal + tax;

  const handleCheckout = () => {
    if (isLogin) {
      toast.success("Proceeding to payment... 🎉");
      setTimeout(() => {
        navigate("/food-payment");
      }, 1500);  // Delay to show toast
    } else {
      toast.error("Please login to proceed to checkout.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const handleClearCart = () => {
    dispatch(clearItems());
    toast.info("Cart cleared successfully!");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
    toast.success("Increased item quantity!");
  };

  const handleDecrement = (id, quantity) => {
    if (quantity === 1) {
      dispatch(removeItem(id));
      toast.info("Item removed from cart.");
    } else {
      dispatch(decrementQuantity(id));
      toast.info("Decreased item quantity.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-8 bg-white min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">
        Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 space-y-6">
          <p className="text-lg">Your cart is empty!</p>
          <Link
            to="/"
            className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-orange-600 transition"
          >
            Add to Cart
          </Link>
        </div>
      ) : (
        <div className="space-y-3 bg-gray-100 rounded-xl shadow-sm p-4">
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.card.info.id}
              className="flex items-center justify-between border-b border-gray-200 py-2"
            >
              <div className="font-medium w-2/3">{item.card.info.name}</div>

              <div className="flex items-center space-x-2 border-2 border-gray-300 text-orange-500 rounded-lg">
                <button
                  onClick={() => handleDecrement(item.card.info.id, item.quantity)}
                  className="px-3 font-bold text-2xl transition"
                >
                  -
                </button>

                <span className="text-lg font-semibold">{item.quantity}</span>

                <button
                  onClick={() => handleIncrement(item.card.info.id)}
                  className="px-3 font-bold text-2xl transition"
                >
                  +
                </button>
              </div>

              <div className="text-gray-700 text-right min-w-[80px]">
                ₹
                {(
                  ((item.card.info.price || item.card.info.defaultPrice) / 100) *
                  item.quantity
                ).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Bill Section */}
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
              <span className="text-xl font-bold text-orange-600">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <button
                onClick={handleCheckout}
                className="w-full sm:w-1/2 bg-orange-500 text-white py-2 rounded-lg text-lg hover:bg-orange-600 transition"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleClearCart}
                className="w-full sm:w-1/2 bg-red-500 text-white py-2 rounded-lg text-lg hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
};

export default FoodCart;
