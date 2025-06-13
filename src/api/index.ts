import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function apiGet<T = unknown>(
  url: string,
  params: Record<string, unknown> = {},
  token?: string
): Promise<T> {
  try {
    const res = await API.get<T>(url, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  } catch (error) {
    console.error(`GET ${url} failed:`, error);
    throw error;
  }
}

export async function apiPost<T = unknown>(
  url: string,
  data: unknown,
  token?: string
): Promise<T> {
  try {
    const res = await API.post<T>(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  } catch (error) {
    console.error(`POST ${url} failed:`, error);
    throw error;
  }
}