import axios, { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const apiClient2 = axios.create({
  baseURL: "https://crm-api.pikado.net/api",
  // baseURL: "http://localhost:1808/api",
});

export const publicApiClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const fileProcessorApiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_FILE_PROCESSOR_URL,
  baseURL: "",
});

export const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp ? decoded.exp < currentTime : true;
};

export const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    const response = await publicApiClient.post("/auth/refresh", {
      token: refreshToken,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data.accessToken;
  }
  return "";
};

export const validateSession = async (): Promise<any> => {
  let accessToken = localStorage.getItem("accessToken") ?? "";
  if (!accessToken) {
    throw new Error("noToken");
  }
  const expired = isTokenExpired(accessToken);
  if (expired) {
    return await refreshToken();
  }
  return accessToken;
};

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await validateSession();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      alert("Your session has expired. Please log in again.");
      // Optionally redirect the user to a login page
      window.location.href = "/login";
    }
    return Promise.reject(error); // Pass the error to the caller
  }
);

apiClient2.interceptors.request.use(
  async (config) => {
    const accessToken = await validateSession();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

fileProcessorApiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await validateSession();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
