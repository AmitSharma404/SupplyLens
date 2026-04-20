

const API_URL = "/api/auth";
const DEFAULT_ERROR_MESSAGE = "Something went wrong";
const ORDER_API_URL = "/api/orders";

const parseResponseBody = async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return await response.json();
    }

    return null;
};

const request = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
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

const orderRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${ORDER_API_URL}${endpoint}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
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

export const register = async (userData) => {
    try {
        return await request('/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const login = async (credentials) => {
    try {
        return await request('/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const logout = async () => {
    try {
        return await request('/logout', {
            method: 'POST',
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const getCurrentUser = async () => {
    try {
        return await request('/');
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}

export const createOrder = async (orderData) => {
    try {
        return await orderRequest('/create', {
            method: 'POST',
            body: JSON.stringify(orderData),
        });
    } catch (error) {
        throw new Error(error?.message || DEFAULT_ERROR_MESSAGE);
    }
}
