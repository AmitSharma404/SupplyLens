

import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const mapApiError = (error) => {
    return (
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong"
    );
};

export const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(mapApiError(error));
    }
}

export const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        throw new Error(mapApiError(error));
    }
}

export const logout = async () => {
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        throw new Error(mapApiError(error));
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/me');
        return response.data;
    } catch (error) {
        throw new Error(mapApiError(error));
    }
}