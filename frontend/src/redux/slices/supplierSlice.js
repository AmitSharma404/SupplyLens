import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSuppliers, createSupplier } from "../../Instance/API.js";

export const fetchSuppliers = createAsyncThunk("suppliers/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await getSuppliers();
    return response.data || response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch suppliers");
  }
});

export const addSupplier = createAsyncThunk("suppliers/add", async (supplierData, thunkAPI) => {
  try {
    const response = await createSupplier(supplierData);
    return response.data || response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Failed to add supplier");
  }
});

const supplierSlice = createSlice({
  name: "suppliers",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default supplierSlice.reducer;
