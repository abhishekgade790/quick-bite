import { useSelector, useDispatch } from "react-redux";
import {
  incrementGroceryQuantity,
  decrementGroceryQuantity,
  removeGroceryItem,
  clearGroceryItems,
} from "../redux/groceryCartSlice";

const GroceryCart = () => {
  const cartItems = useSelector((state) => state.groceryCart.items);
  const dispatch = useDispatch();

  const getTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.card.info.price.replace(/[^\d.]/g, ""));
      return acc + price * item.quantity;
    }, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        🛒 Your grocery cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Grocery Cart
      </h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.card.info.id}
            className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow p-4 gap-6"
          >
            <img
              src={item.card.info.image}
              alt={item.card.info.name}
              className="w-28 h-28 object-cover rounded"
            />
            <div className="flex-1 w-full">
              <h2 className="text-xl font-semibold text-green-800">
                {item.card.info.name}
              </h2>
              <p className="text-sm text-gray-500">{item.card.info.category}</p>
              <p className="text-md text-gray-800 font-bold mt-1">
                {item.card.info.price}
              </p>

              <div className="flex items-center justify-between mt-4 w-full md:w-64">
                <button
                  onClick={() => dispatch(decrementGroceryQuantity(item.card.info.id))}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  -
                </button>
                <span className="text-lg font-bold">{item.quantity}</span>
                <button
                  onClick={() => dispatch(incrementGroceryQuantity(item.card.info.id))}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => dispatch(removeGroceryItem(item.card.info.id))}
              className="text-red-500 font-semibold hover:underline mt-4 md:mt-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right">
        <p className="text-xl font-bold text-gray-800">
          Total: ₹{getTotal().toFixed(2)}
        </p>
        <button
          onClick={() => dispatch(clearGroceryItems())}
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default GroceryCart;
