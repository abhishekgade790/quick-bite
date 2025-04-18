import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import groceryCartReducer from "./groceryCartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    groceryCart: groceryCartReducer,
  },
});

export default appStore;
