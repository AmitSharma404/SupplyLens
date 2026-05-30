import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, createProduct, deleteProduct } from "../../Instance/API.js";

export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await getProducts();
    // Assuming backend returns { success: true, count, products: [...] } or data: [...]
    return response.products || response.data || response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch products");
  }
});

export const addProduct = createAsyncThunk("products/add", async (productData, thunkAPI) => {
  try {
    const response = await createProduct(productData);
    return response.product || response.data || response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Failed to add product");
  }
});

export const removeProduct = createAsyncThunk("products/remove", async (id, thunkAPI) => {
  try {
    await deleteProduct(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Failed to delete product");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload && p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
