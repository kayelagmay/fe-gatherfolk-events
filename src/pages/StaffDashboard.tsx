import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, logout as authLogout } from '../api/auth';
import { fetchEvents, deleteEvent } from '../api/events';
import CreateEventForm from '../components/CreateEventForm';
import EditEventForm from '../components/EditEventForm';
import type { Event } from '../types';

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/staff-login');
      return;
    }

    getMe(token)
      .then(() => loadEvents())
      .catch(() => navigate('/staff-login'));
  }, [navigate]);


  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const evs = await fetchEvents();
      setEvents(evs);
    } catch (err: unknown) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    const token = localStorage.getItem('admin_token')!;
    try {
      await deleteEvent(token, id);
      loadEvents();
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert('Delete failed');
    }
  };

  const handleLogout = () => {
    authLogout();
    navigate('/staff-login');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Staff Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Back to Events
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <CreateEventForm onSuccess={loadEvents} />

      {loading && <p className="text-center text-gray-500 mb-4">Loading events...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <h2 className="text-xl font-semibold mb-2">Current Events</h2>
      <ul className="space-y-4">
      {events.map(ev => (
          <li key={ev.id} className="border p-4 bg-white rounded">
            {editingId === ev.id ? (
              <EditEventForm
                event={ev}
                onSaved={() => { loadEvents(); setEditingId(null); }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg mb-1">{ev.title}</h3>
                  <p className="text-gray-600 mb-1">
                    {new Date(ev.start_date).toLocaleString()}
                    {ev.end_date && ` – ${new Date(ev.end_date).toLocaleString()}`}
                  </p>
                  {ev.venue && <p className="italic mb-1">Venue: {ev.venue}</p>}
                  {ev.description && <p className="mb-2">{ev.description}</p>}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingId(ev.id!)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};