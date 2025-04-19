import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3000";

export const useAxios = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

useAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["role-type"] = Cookies.get("role_type");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthApi = {
  async loginUser(email, password) {
    try {
      const response = await useAxios.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      console.error("Error log in:", error);
      throw error;
    }
  },

  async getUserData() {
    try {
      const response = await useAxios.get("/auth/users");
      return response.data.result.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
};

export const ListingApi = {
  async getListingData() {
    try {
      const response = await useAxios.get("/listing");
      return response.data.result.data;
    } catch (error) {
      console.error("Error fetching listing:", error);
      throw error;
    }
  },
  async addListingData(data) {
    try {
      const response = await useAxios.post("/listing", data);
      return response.data.result.data;
    } catch (error) {
      console.error("Error adding listing:", error);
      throw error;
    }
  },
  async updateListingData(data) {
    try {
      const response = await useAxios.patch("/listing", data);
      return response.data.result.data;
    } catch (error) {
      console.error("Error updating listing:", error);
      throw error;
    }
  },
  async deleteListingData(id) {
    try {
      const response = await useAxios.delete("/listing/" + id);
      return response.data.result.data;
    } catch (error) {
      console.error("Error fetching listing:", error);
      throw error;
    }
  },
};
