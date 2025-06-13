import React, { useState } from 'react';
import { createEvent } from '../api/events';
import type { Event } from '../types';

interface Props {
  onSuccess: () => void;
}

export default function CreateEventForm({ onSuccess }: Props) {
  const [form, setForm] = useState<Partial<Event>>({});
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const token = localStorage.getItem('admin_token')!;
    try {
      await createEvent(token, form as Event);
      setForm({});
      onSuccess();
    } catch (err: unknown) {
      console.error('Create event error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 max-w-xl">
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-xl font-semibold mb-2">Add New Event</h2>
      <input
        className="border px-4 py-2 rounded w-full"
        placeholder="Title"
        value={form.title || ''}
        onChange={e => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="datetime-local"
        className="border px-4 py-2 rounded w-full"
        value={form.start_date || ''}
        onChange={e => setForm({ ...form, start_date: e.target.value })}
        required
      />
      <input
        type="datetime-local"
        className="border px-4 py-2 rounded w-full"
        value={form.end_date || ''}
        onChange={e => setForm({ ...form, end_date: e.target.value })}
      />
      <input
        className="border px-4 py-2 rounded w-full"
        placeholder="Venue"
        value={form.venue || ''}
        onChange={e => setForm({ ...form, venue: e.target.value })}
      />
      <textarea
        className="border px-4 py-2 rounded w-full"
        placeholder="Description"
        value={form.description || ''}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        Save Event
      </button>
    </form>
  );
};