import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, incrementQuantity, decrementQuantity } from "../store/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.card.info.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddItem = (item) => {
    dispatch(addItem({ ...item, quantity: 1 }));
    toast.success(`${item.card.info.name} added to cart!`);
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
    toast.info("Item quantity increased");
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
    toast.info("Item quantity decreased");
  };

  return (
    <div className="space-y-6 p-4">
      {items?.map((item) => {
        const itemId = item?.card?.info?.id;
        const quantity = getItemQuantity(itemId);

        return (
          <div
            key={itemId}
            className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white border-b-2 border-gray-200 pb-5"
          >
            {/* Item Details */}
            <div className="w-full sm:w-3/4 ">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {item?.card?.info?.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                ₹
                {item?.card?.info?.price
                  ? item?.card?.info?.price / 100
                  : item?.card?.info?.defaultPrice / 100}
              </p>
              {item?.card?.info?.description && (
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                  {item.card.info.description}
                </p>
              )}
            </div>

            {/* Item Image & Counter */}
            <div className="relative w-full sm:w-1/4 flex justify-center items-center mt-4 sm:mt-0">
              {item?.card?.info?.imageId && (
                <img
                  src={CDN_URL + item.card.info.imageId}
                  alt={item.card.info.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}

              {/* ADD Button or Counter */}
              {quantity === 0 ? (
                <button
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 px-4 py-1 text-sm font-semibold text-green-600 border border-green-400 rounded-lg bg-white cursor-pointer hover:bg-green-100 transition"
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>
              ) : (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center bg-white border border-green-400 rounded-lg overflow-hidden shadow-sm">
                  <button
                    className="px-3 py-1 text-green-600 font-bold hover:bg-green-100 transition"
                    onClick={() => handleDecrement(itemId)}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-gray-800 font-semibold">
                    {quantity}
                  </span>
                  <button
                    className="px-3 py-1 text-green-600 font-bold hover:bg-green-100 transition"
                    onClick={() => handleIncrement(itemId)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Toast Container with centered messages */}
      <ToastContainer 
        position="top-center" // Position the toast at the top center
        autoClose={1000} // Duration before the toast disappears
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Newest toast on top
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ItemList;
