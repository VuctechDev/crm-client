import axios, { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { logOut } from "@/hooks/useLogoutObserver";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: "http://localhost:3000/api",
});

export const apiClient2 = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const publicApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: "http://localhost:3000/api",
});

export const fileProcessorApiClient = axios.create({
  baseURL: import.meta.env.VITE_FILE_PROCESSOR_URL,
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
    // logOut();

    console.log("OPAAAAA");
  }
  const expired = isTokenExpired(accessToken);
  if (expired) {
    const roken = await refreshToken();
    if (!roken) {
      logOut();
    }
    return roken;
  }
  return accessToken;
};

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await validateSession();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      // config.headers["Access-Control-Allow-Origin"] = "*";
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

publicApiClient.interceptors.request.use(
  async (config) => {
    // config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers["Access-Control-Allow-Headers"] = "*";
    // config.headers["Access-Control-Allow-Origin"] = "*";
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
      logOut();
      // alert("Your session has expired. Please log in again.");
      // Optionally redirect the user to a login page
      // window.location.href = "/login";
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
