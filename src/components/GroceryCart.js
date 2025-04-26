import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementGroceryQuantity,
  decrementGroceryQuantity,
  removeGroceryItem,
  clearGroceryItems,
} from "../store/groceryCartSlice";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GroceryCart = () => {
  const cartItems = useSelector((state) => state.groceryCart.items);
  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subTotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const tax = subTotal * 0.1;
  const totalAmount = subTotal + tax;

  const handleProceedToCheckout = () => {
    if (isLogin) {
      navigate("/grocery-payment");
    } else {
      toast.error("Please login to proceed to payment.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center py-4 text-center space-y-6 text-gray-600">
        <div className="text-green-700 font-bold text-3xl">Cart</div>
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
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">Grocery Cart</h1>

      <div className="space-y-3 bg-gray-100 rounded-xl shadow-sm p-4">
        {/* Cart Items */}
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-2">
            <div className="font-medium w-2/3">{item.name}</div>

            <div className="flex items-center space-x-2 border-2 border-gray-300 text-green-500 rounded-lg">
              <button
                onClick={() => {
                  if (item.quantity === 1) {
                    dispatch(removeGroceryItem(item.id));
                  } else {
                    dispatch(decrementGroceryQuantity(item.id));
                  }
                }}
                className="px-3 font-bold text-2xl transition"
              >
                -
              </button>

              <span className="text-lg font-semibold">{item.quantity}</span>

              <button
                onClick={() => dispatch(incrementGroceryQuantity(item.id))}
                className="px-3 font-bold text-2xl transition"
              >
                +
              </button>
            </div>

            <div className="text-gray-700 text-right min-w-[80px]">
              ₹{(parseFloat(item.price.replace(/[^\d.]/g, "")) * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Bill Section */}
        <div className="mt-8 p-4 border-t-2 border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bill Summary</h2>

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

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <button
              onClick={handleProceedToCheckout}
              className="w-full sm:w-1/2 bg-green-600 text-white py-2 rounded-lg text-lg hover:bg-green-700 transition"
            >
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
        
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss theme="light" />
    </div>
  );
}

export default GroceryCart;
             
