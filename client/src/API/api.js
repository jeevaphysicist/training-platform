import axios from "axios";
import Cookies from "js-cookie";
import { useHandleLogout } from "../utils/useHandleLogout";

const BASE_URL = "http://localhost:8080/api";
let refreshToken = Cookies.get("refresh_token");

// Public axios instance (no authorization)
const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Private axios instance (with authorization)
const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for privateApi to add access token to headers
privateApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${refreshToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for privateApi to handle token refresh
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshed = await refreshAccessToken();
      if (refreshed) {
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return privateApi(originalRequest);
      } else {
        useHandleLogout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Function to refresh the access token
export async function refreshAccessToken() {
  try {
    let formData = convertToFormData({ refresh: refreshToken });
    const response = await publicApi.post("/accounts/auth/refresh/", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.status === 200) {
      accessToken = response.data.access;
      // console.log("accessToken response",response.data);
      Cookies.set("access_token", accessToken, { expires: 1 / 24 });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

// Utility function to convert an object to FormData
const convertToFormData = (obj) => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData;
};

// S.No 1
// Login Handler
export const handleLogin = async (data) => {
  try {
    const response = await publicApi.post("/auth/login", data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 2
// Signup Handler
export const handleSignup = async (data) => {
  try {
    const response = await publicApi.post("/auth/signup/", data);
    return response;
  } catch (error) {
    return error;
  }
};




// S.No 3
// Update Profile Handler
export const handleUpdateProfile = async (data) => {
  try {
    const response = await privateApi.put("/accounts/update-profile/1/", data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 4
// Create Course Handler
export const handleCreateCourse = async (course) => {
  try {
    const response = await privateApi.post('/course/courses', course);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 5
// Update Course Handler
export const handleUpdateCourse = async (id,course) => {
  try {
    const response = await privateApi.put(`/course/courses/${id}`, course);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 6
// Get Course Handler
export const handleGetCourse = async () => {
  try {
    const response = await privateApi.get('/course/courses');
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 7
// Get Course Handler
export const handleDeleteCourse = async (id) => {
  try {
    const response = await privateApi.delete(`/course/courses/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};