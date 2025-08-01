
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductByCategory } from "../slices/productSlice";

// get all products data
export const getAllProducts = createAsyncThunk<
  { products: Product[]; total: number },
  { limit: number; skip: number },
  { rejectValue: string }
>("products/getAllProducts", async ({ limit, skip }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) throw new Error("Failed to fetch products!");
    const data = await response.json();
    return {
      products: data?.products,
      total: data?.total,
    };
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});


// get sorted products data
export const getSortedProducts = createAsyncThunk<
  { products: Product[]; total: number },
  { title: string; order: string },
  { rejectValue: string }
>("products/getSortedProducts", async ({ title, order }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?sortBy=${title}&order=${order}`
    );
    if (!response.ok) throw new Error("Failed to fetch products!");
    const data = await response.json();
    return {
      products: data?.products,
      total: data?.total,
    };
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});



// get a single product data
export const getSingleProduct = createAsyncThunk<
  Product, 
  { id: number },
  { rejectValue: string }
>("products/getSingleProduct", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch single data product!");
    const data = await response.json();
    console.log('get single product data',data)
    return data; 
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// get all category list
export const getCategoryList = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("products/getCategoryList", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category-list"
    );
    if (!response.ok) throw new Error("Failed to fetch categories!");
    const data: string[] = await response.json();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

//get products by category name
export const getProductsByCategory = createAsyncThunk<
  { productsByCategory: ProductByCategory[] },
  { category: string },
  { rejectValue: string }
>("products/getProductsByCategory", async ({ category }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    if (!response.ok) throw new Error("Failed to fetch products!");
    const data = await response.json();
    return {
      productsByCategory: data?.products,
    };
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// search products
export const searchProducts = createAsyncThunk<
  { products: Product[]; total: number },
  { query: string },
  { rejectValue: string }
>(
  "products/searchProducts",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results!");
      const data = await response.json();
      return {
        products: data.products,
        total: data.total,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);