import React, { useState } from 'react';
import type { Event } from '../types';
import { updateEvent } from '../api/events';

interface Props {
  event: Event;
  onSaved: () => void;
  onCancel: () => void;
}

export default function EditEventForm({ event, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Event>>(event);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem('admin_token')!;
      await updateEvent(token, event.id!, form);
      onSaved();
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 bg-gray-50 rounded">
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Title"
        value={form.title || ''}
        onChange={e => setForm({ ...form, title: e.target.value })}
        required
      />
      <label className="block">
        Start:
        <input
          type="datetime-local"
          className="w-full border px-3 py-2 rounded mt-1"
          value={form.start_date?.slice(0,16) || ''}
          onChange={e => setForm({ ...form, start_date: e.target.value })}
          required
        />
      </label>
      <label className="block">
        End:
        <input
          type="datetime-local"
          className="w-full border px-3 py-2 rounded mt-1"
          value={form.end_date?.slice(0,16) || ''}
          onChange={e => setForm({ ...form, end_date: e.target.value })}
        />
      </label>
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Venue"
        value={form.venue || ''}
        onChange={e => setForm({ ...form, venue: e.target.value })}
      />
      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="Description"
        value={form.description || ''}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <div className="flex space-x-2">
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}