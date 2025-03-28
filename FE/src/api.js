// api.js - Xử lý gọi API từ frontend
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token trong header
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
    const { token } = response.data;
    localStorage.setItem('token', token); // Lưu token vào localStorage
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

export async function createSchedule(name, description, time, start_time, end_time) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }

    const response = await fetch("http://localhost:8000/api/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name,
        description,
        time,
        start_time,
        end_time,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi tạo lịch");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createSchedule:", error.message);
    throw error;
  }
}

export const updateSchedule = async (id, name, description, time, startTime, endTime) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }

    const response = await fetch(`http://localhost:8000/api/update-schedule/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        time,
        start_time: startTime,
        end_time: endTime,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi cập nhật lịch");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updateSchedule:", error.message);
    throw error;
  }
}

export const login_admin = async (username, password) => {
  try {
    const response = await api.post("/login_admin", { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi không xác định";
  }
};

export const getSchedule = async () => {
  try {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    const response = await api.get("/get-schedule", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi không xác định";
  }
};
export const deleteSchedule = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }

    const response = await api.delete(`/delete-schedule/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi xóa lịch");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in deleteSchedule:", error.message);
    throw error;
  }
};



export default api;