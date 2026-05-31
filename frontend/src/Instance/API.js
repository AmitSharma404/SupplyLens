const API_URL = import.meta.env.VITE_API_URL || "/api";
const DEFAULT_ERROR_MESSAGE = "Something went wrong";

const parseResponseBody = async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return await response.json();
    }

    return null;
};

const request = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
        ...options,
    });

    const data = await parseResponseBody(response);

    if (!response.ok) {
        throw new Error(data?.message || DEFAULT_ERROR_MESSAGE);
    }

    return data;
};

// --- Auth Endpoints ---
export const register = async (userData) => {
    try {
        return await request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const login = async (credentials) => {
    try {
        const data = await request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        if (data && data.token) {
            localStorage.setItem('token', data.token);
        }
        return data;
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const logout = async () => {
    try {
        const data = await request('/auth/logout', {
            method: 'POST',
        });
        localStorage.removeItem('token');
        return data;
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const getCurrentUser = async () => {
    try {
        return await request('/auth/me');
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

// --- Product Endpoints ---
export const getProducts = async () => {
    try {
        const res = await request('/products');
        return res;
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const createProduct = async (productData) => {
    try {
        return await request('/products', {
            method: 'POST',
            body: JSON.stringify(productData),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const updateProduct = async (id, productData) => {
    try {
        return await request(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const deleteProduct = async (id) => {
    try {
        return await request(`/products/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

// --- Supplier Endpoints ---
export const getSuppliers = async () => {
    try {
        return await request('/suppliers');
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const createSupplier = async (supplierData) => {
    try {
        return await request('/suppliers', {
            method: 'POST',
            body: JSON.stringify(supplierData),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

// --- Dashboard Endpoints ---
export const getDashboardStats = async () => {
    try {
        return await request('/dashboard/stats');
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

// --- Stock Movement Endpoints ---
export const stockIn = async (data) => {
    try {
        return await request('/stock/in', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const stockOut = async (data) => {
    try {
        return await request('/stock/out', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const stockSell = async (data) => {
    try {
        return await request('/stock/sell', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const stockAdjust = async (data) => {
    try {
        return await request('/stock/adjust', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const getStockHistory = async (productId) => {
    try {
        return await request(`/stock/history/${productId}`);
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

// --- Purchase Order Endpoints ---
export const getOrders = async () => {
    try {
        return await request('/orders');
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const createOrder = async (orderData) => {
    try {
        return await request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const updateOrderStatus = async (id, status) => {
    try {
        return await request(`/orders/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

// --- Alert Endpoints ---
export const getAlerts = async (read = false) => {
    try {
        return await request(`/alerts?read=${read}`);
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const markAlertRead = async (id) => {
    try {
        return await request(`/alerts/${id}/read`, {
            method: 'PUT'
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

// --- Forecast Endpoints ---
export const getForecast = async (productId) => {
    try {
        return await request(`/forecast/${productId}`);
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

// --- User Endpoints ---
export const getUsers = async () => {
    try {
        return await request('/users');
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const updateUserRole = async (id, role) => {
    try {
        return await request(`/users/${id}/role`, {
            method: 'PUT',
            body: JSON.stringify({ role }),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}