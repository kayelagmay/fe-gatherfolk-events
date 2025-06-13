import { apiGet, apiPost } from './index';
import type { Event } from '../types';

const API = import.meta.env.VITE_API_URL;

export async function fetchEvents(): Promise<Event[]> {
  const { events } = await apiGet<{ events: Event[] }>('/api/events');
  return events;
}

export async function signupEvent(
  id: number,
  payload: { name: string; email: string }
): Promise<void> {
  try {
    await apiPost<{ signup: unknown }>(`/api/events/${id}/signup`, payload);
  } catch (err: unknown) {
    // Normalize error
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Signup failed');
  }
}

export async function createEvent(
  token: string,
  eventData: Omit<Event, 'id'>
): Promise<Event> {
  const { event } = await apiPost<{ event: Event }>(
    '/api/events',
    eventData,
    token
  );
  return event;
}

/** Update an existing event (staff only) */
export async function updateEvent(
  token: string,
  id: number,
  updates: Partial<Omit<Event, 'id'>>
): Promise<Event> {
  const res = await fetch(`${API}/api/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    let msg = 'Failed to update event';
    try {
      const body = await res.json();
      msg = body.message || msg;
    } catch(parseErr) {
      console.warn('Could not parse error response as JSON:', parseErr);
    }
    throw new Error(msg);
  }

  const { event } = await res.json();
  return event;
}

export async function deleteEvent(
  token: string,
  id: number
): Promise<void> {
  const res = await fetch(`${API}/api/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let msg = 'Failed to delete event';
    try {
      const body = await res.json();
      msg = body.message || msg;
    } catch(parseErr) {
      console.warn('Could not parse error response as JSON:', parseErr);
    }
    throw new Error(msg);
  }
}