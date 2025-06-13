const API = import.meta.env.VITE_API_URL;

export interface AuthResponse {
  token: string;
}

export async function login(
  email: string,
  password: string
): Promise<string> {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || 'Login failed');
  }

  const data: AuthResponse = await res.json();
  return data.token;
}

export async function getMe(token: string): Promise<{ role: string }> {
  const res = await fetch(`${API}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('Not authenticated');
  }

  const data = await res.json();
  return data.user;
}

export function logout(): void {
  localStorage.removeItem('admin_token');
}

