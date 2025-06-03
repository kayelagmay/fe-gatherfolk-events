import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import EventCard from "./EventCard";

interface Event {
  title: string;
  date: { start_date: string; end_date?: string } | string;
  venue?: { name: string };
  description?: string;
  link?: string;
}

const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents()
      .then((events) => {
        setEvents(events || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load events.");
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (events.length === 0) return <p className="text-center">No events found.</p>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
