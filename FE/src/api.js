// api.js - Xử lý gọi API từ frontend
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (name, email, password) => {
  try {
    const response = await api.post("/register", { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi không xác định";
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi không xác định";
  }
};

export const getUser = async (token) => {
  try {
    const response = await api.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Không thể lấy thông tin người dùng";
  }
};

export const logout = async (token) => {
  try {
    const response = await api.post("/logout", {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi khi đăng xuất";
  }
};
export const createSchedule = async (name, description, time, startTime, endTime) => {
  try {
    const response = await api.post("/create-schedule", { name, description, time, start_time: startTime, end_time: endTime });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi không xác định";
  }
};

export const updateSchedule = async (id, name, description, time, startTime, endTime) => {
  try {
    const response = await api.put(`/update-schedule/${id}`, { name, description, time, start_time: startTime, end_time: endTime });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi không xác định";
  }
};

export const login_admin = async (username, password) => {
  try {
    const response = await api.post("/login_admin", { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi không xác định";
  }
};


export default api;