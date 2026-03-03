// frontend/src/api/client.js
import axios from "axios";

// 1) Base URL: env first, fallback localhost
const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// 2) Axios client
const client = axios.create({
  baseURL: API,
});

// 3) Token interceptor (Bearer token)
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("tv_token") || localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 4) Fetch wrapper function (optional use)
export async function api(path, { method = "GET", body, token } = {}) {
  const authToken = token || localStorage.getItem("tv_token") || localStorage.getItem("token");

  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

export default client;
