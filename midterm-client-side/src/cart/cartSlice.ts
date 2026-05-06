import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const MAX_UNIQUE_ITEMS = 10;
const MAX_TOTAL_ITEMS = 50;

const initialState: CartState = {
  items: [],
};

const getTotalItems = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;

      const existing = state.items.find(
        (item) => item.productId === productId
      );

      const totalItems = getTotalItems(state.items);

      if (totalItems + quantity > MAX_TOTAL_ITEMS) return;

      if (existing) {
        existing.quantity += quantity;
      } else {
        
        if (state.items.length >= MAX_UNIQUE_ITEMS) return;

        state.items.push({ productId, quantity });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (i) => i.productId === action.payload
      );

      if (!item) return;

      const totalItems = getTotalItems(state.items);
      if (totalItems + 1 > MAX_TOTAL_ITEMS) return;

      item.quantity++;
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (i) => i.productId === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.items = state.items.filter(
          (i) => i.productId !== action.payload
        );
      }
    },

    setQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;

      if (quantity < 1) return;

      const item = state.items.find(
        (i) => i.productId === productId
      );

      if (!item) return;

      item.quantity = quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
