import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api/events';
import { Event } from '../types';
import EventCard from '../components/EventCard';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents()
      .then(fetched => setEvents(fetched || []))
      .catch(() => setError('Failed to load events.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!events.length) return <p>No events found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Browse All Events</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map(ev => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>
    </div>
  );
}