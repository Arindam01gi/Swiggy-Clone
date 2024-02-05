import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      const newItemId = action.payload.card.info.id;
      // console.log(newItemId)
      const existingItem = state.items.find(
        (item) => item.card?.info?.id === newItemId
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({...action.payload,quantity:1});
      }

    },
    incrementItem: (state, action) => {
        state.items = state.items.map((item) => {
          if (item.card.info.id === action.payload.card.info.id) {
            item.quantity++;
          }
          return item;
        });
      },

    removeItems: (state, action) => {
      state.items = state.items
        .map((item) => {
          if (item?.card?.info?.id === action.payload.card?.info.id) {
            item.quantity--;
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const {
  addItems,
  removeItems,
  incrementItem,
  decrementItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
