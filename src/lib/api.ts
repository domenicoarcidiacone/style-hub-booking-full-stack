const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  health: () => http<{ status: string }>(`/health`),
  getSpecialists: () =>
    http<{ items: Array<{ id: string; name: string; available: boolean }> }>(
      `/specialists`
    ),
  getServices: () =>
    http<{
      items: Array<{
        id: string;
        name: string;
        price_eur: number;
        duration_min: number;
        rating: number;
        description?: string;
      }>;
    }>(`/services`),
  getFavorites: () =>
    http<{
      items: Array<{
        id: string;
        name: string;
        price: string;
        duration: string;
        rating: number;
        description?: string;
        lastBooked?: string;
      }>;
    }>(`/favorites`),
  getAppointments: () => http<{ items: Array<any> }>(`/appointments`),
  createAppointment: (payload: any) =>
    http<any>(`/appointments`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
