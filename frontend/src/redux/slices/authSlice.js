import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
} from "../../Instance/API";

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const data = await getCurrentUser();
    return data.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const data = await loginRequest(credentials);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Login failed");
  }
});

export const registerUser = createAsyncThunk("auth/register", async (payload, thunkAPI) => {
  try {
    const data = await registerRequest(payload);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Register failed");
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutRequest();
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Logout failed");
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  checkingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
 main
        state.isAuthenticated = true;
        state.user = action.payload;
        state.checkingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.checkingAuth = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
