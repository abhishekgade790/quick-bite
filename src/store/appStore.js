import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import groceryCartReducer from "./groceryCartSlice";
import {loginStatusReducer} from "./loginStatusSlice";


const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    groceryCart: groceryCartReducer,
    loginStatus: loginStatusReducer,
  },
});

export default appStore;
