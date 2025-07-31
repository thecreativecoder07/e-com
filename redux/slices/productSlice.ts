import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getCategoryList,
  getProductsByCategory,
  getSingleProduct,
  searchProducts,
} from "../thunk/productThunk";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images: string[]; 
  description: string;
  category: string;
  rating: number;
  discountPercentage: number; 
  brand: string;              
  stock: number;            
}


export interface ProductByCategory {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
}

interface ProductState {
  products: Product[];
  productsByCategory: ProductByCategory[];
  singleProductData: Product | null;
  categories: string[];
  productLoading: boolean;
  productCategoryLoading: boolean;
  categoryLoading: boolean;
  error: string | null;
  total: number;
  searchResults: Product[];
  searchLoading: boolean;
  searchError: string | null;
  searchTotal: number;
}

const initialState: ProductState = {
  products: [],
  productsByCategory: [],
  singleProductData: null,
  categories: [],
  productLoading: false,
  productCategoryLoading: false,
  categoryLoading: false,
  error: null,
  total: 0,
   searchResults: [],
  searchLoading: false,
  searchError: null,
  searchTotal: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
     clearSearchResults(state) {
      state.searchResults = [];
      state.searchError = null;
      state.searchLoading = false;
      state.searchTotal = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all products
      .addCase(getAllProducts.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // get single product data
      .addCase(getSingleProduct.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.singleProductData = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // get category list
      .addCase(getCategoryList.pending, (state) => {
        state.categoryLoading = true;
        state.error = null;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // get all products by category name
      .addCase(getProductsByCategory.pending, (state) => {
        state.productCategoryLoading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.productCategoryLoading = false;
        state.productsByCategory = action.payload.productsByCategory;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.productCategoryLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })

       // search case
      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.products;
        state.searchTotal = action.payload.total;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload ?? "Something went wrong";
      });
  },
});

export const { clearSearchResults } = productSlice.actions;
export default productSlice.reducer;
