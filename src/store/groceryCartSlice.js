import { createSlice } from "@reduxjs/toolkit";

const groceryCartSlice = createSlice({
  name: "groceryCart",
  initialState: {
    items: [],
  },
  reducers: {
    addGroceryItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    incrementGroceryQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementGroceryQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
    },
    removeGroceryItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearGroceryItems: (state) => {
      state.items = [];
    },
  },
});

export const {
  addGroceryItem,
  incrementGroceryQuantity,
  decrementGroceryQuantity,
  removeGroceryItem,
  clearGroceryItems,
} = groceryCartSlice.actions;

export default groceryCartSlice.reducer;
