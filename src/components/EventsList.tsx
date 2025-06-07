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
    <div className="p-4">
      {/* Login buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => window.location.href = "/staff-login"}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Staff Login
        </button>
  
        <button
          onClick={() => alert("User login not implemented in MVP")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          User Login
        </button>
      </div>
  
      {/* Events grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
