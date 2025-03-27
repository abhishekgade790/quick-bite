import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate Bill Details
  const subTotal = cartItems.reduce((total, item) => {
    const price = item.card.info.price
      ? (item.card.info.price / 100) * item.quantity
      : (item.card.info.defaultPrice / 100) * item.quantity;
    return total + price;
  }, 0);

  const tax = subTotal * 0.1; // Assuming 10% tax
  const totalAmount = subTotal + tax;

  return (
    <div className="max-w-4xl mx-auto my-10 px-8 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">
        Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="space-y-3 bg-gray-100 rounded-xl shadow-sm p-4">
          {/* Cart Items */}
          {cartItems.map((item) => (
            console.log(item),
            <div
              key={item.card.info.id}
              className="flex items-center justify-between"
            >
              {/* Item Name */}
              <div className="font-medium w-2/3">{item.card.info.name}</div>

              {/* Item Counter */}
              <div className="flex items-center space-x-2 border-2 border-gray-300 text-green-500 rounded-lg">
                <button
                  onClick={() => {
                    if (item.quantity === 1) {
                      dispatch(removeItem(item.card.info.id)); // Remove if quantity is 1
                    } else {
                      dispatch(decrementQuantity(item.card.info.id));
                    }
                  }}
                  className="px-3 font-bold text-2xl transition"
                >
                  -
                </button>

                <span className="text-lg font-semibold">{item.quantity}</span>

                <button
                  onClick={() => dispatch(incrementQuantity(item.card.info.id))}
                  className="px-3 font-bold text-2xl transition"
                >
                  +
                </button>
              </div>

              {/* Item Price */}
              <div className="text-gray-700">
                ₹
                {item.card.info.price
                  ? (item.card.info.price / 100) * item.quantity
                  : (item.card.info.defaultPrice / 100) * item.quantity}
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
              <span className="text-xl font-bold text-green-600">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <button className="w-full mt-6 bg-orange-500 text-white py-2 rounded-lg text-lg hover:bg-orange-600 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
