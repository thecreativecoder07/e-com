import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addToCart,
  getCartByUser,
  CartResponse,
  UserCart,
  CartProduct,
} from "../thunk/cartThunk";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
  clearCartFromLocalStorage,
} from "@/utils/localstorage";

interface CartState {
  cart: CartResponse | null;
  userCart: UserCart[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  userCart: loadCartFromLocalStorage() || [],
  loading: false,
  error: null,
};

const syncAndReturn = (updatedCart: UserCart[]) => {
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.userCart = [];
      clearCartFromLocalStorage();
    },
    removeItem(state, action: PayloadAction<number>) {
      const productId = action.payload;
      const updatedCart = state.userCart.map(cart => ({
        ...cart,
        products: cart.products.filter(product => product.id !== productId),
      }));
      state.userCart = syncAndReturn(updatedCart);
    },
    updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const updatedCart = state.userCart.map(cart => ({
        ...cart,
        products: cart.products
          .map(product =>
            product.id === productId
              ? { ...product, quantity }
              : product
          )
          .filter(product => product.quantity > 0),
      }));
      state.userCart = syncAndReturn(updatedCart);
    },
    setUserCart(state, action: PayloadAction<UserCart[]>) {
      state.userCart = action.payload;
      saveCartToLocalStorage(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const newCart = action.payload;
        const newProducts = newCart.products;
        const updatedUserCart = [...state.userCart];
        const existingCartIndex = updatedUserCart.findIndex(
          (cart) => cart.userId === newCart.userId
        );

        if (existingCartIndex !== -1) {
          const existingCart = updatedUserCart[existingCartIndex];
          const updatedProductsMap = new Map<number, CartProduct>();

          for (const p of existingCart.products) {
            updatedProductsMap.set(p.id, p);
          }

          for (const p of newProducts) {
            if (updatedProductsMap.has(p.id)) {
              const existing = updatedProductsMap.get(p.id)!;
              updatedProductsMap.set(p.id, {
                ...existing,
                quantity: existing.quantity + p.quantity,
                total: existing.total + p.total,
                discountedPrice: existing.discountedPrice + p.discountedPrice,
                thumbnail: existing.thumbnail
              });
            } else {
              updatedProductsMap.set(p.id, p);
            }
          }

          updatedUserCart[existingCartIndex] = {
            ...existingCart,
            products: Array.from(updatedProductsMap.values()),
          };
        } else {
          updatedUserCart.push(newCart as UserCart);
        }

        state.userCart = syncAndReturn(updatedUserCart);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(getCartByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userCart = syncAndReturn(action.payload.carts);
      });
  },
});

export const {
  clearCart,
  removeItem,
  updateQuantity,
  setUserCart,
} = cartSlice.actions;

export default cartSlice.reducer;
