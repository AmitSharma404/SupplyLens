import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboardStats } from "../../Instance/API.js";

export const fetchDashboardStats = createAsyncThunk("dashboard/fetchStats", async (_, thunkAPI) => {
  try {
    const response = await getDashboardStats();
    return response.data || response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch dashboard stats");
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
