import { createAsyncThunk } from "@reduxjs/toolkit";

export interface CartProductInput {
  id: number;
  quantity: number;
}

export interface AddToCartInput {
  userId: number;
  products: CartProductInput[];
}

export interface CartResponse {
  id: number;
  userId: number;
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
    thumbnail: string;
  }[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface UserCart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  thumbnail : string;
}

interface GetCartResponse {
  carts: UserCart[];
  total: number;
  skip: number;
  limit: number;
}


export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

// Add to Cart Thunk
export const addToCart = createAsyncThunk<
  CartResponse,
  AddToCartInput,
  { rejectValue: string }
>("cart/addToCart", async (cartInput, thunkAPI) => {
  try {
    const response = await fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartInput),
    });

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }

    const data: CartResponse = await response.json();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// get cart data by user
export const getCartByUser = createAsyncThunk<
  GetCartResponse,           
  number,                    
  { rejectValue: string }   
>(
  "cart/getCartByUser",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/user/${userId}`);
      if (!response.ok) throw new Error("API fetch failed!");

      const data: GetCartResponse = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update product quantity 
export const updateCart = createAsyncThunk<
  CartResponse,
  { cartId: number; products: CartProductInput[] },
  { rejectValue: string }
>("cart/updateCart", async ({ cartId, products }, thunkAPI) => {
  try {
    const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ merge: true, products }),
    });
    if (!response.ok) throw new Error("Failed to update cart");

    const data: CartResponse = await response.json();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Delete cart
export const deleteCart = createAsyncThunk<
  { isDeleted: boolean; cartId: number },
  number,
  { rejectValue: string }
>("cart/deleteCart", async (cartId, thunkAPI) => {
  try {
    const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete cart");

    const data = await response.json();
    return { isDeleted: true, cartId };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
