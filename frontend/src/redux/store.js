import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productSlice.js";
import dashboardReducer from "./slices/dashboardSlice.js";
import supplierReducer from "./slices/supplierSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    dashboard: dashboardReducer,
    suppliers: supplierReducer,
  },
});

