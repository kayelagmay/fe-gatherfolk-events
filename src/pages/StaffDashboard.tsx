import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Event {
  title: string;
  date: string;
  venue?: string;
  description?: string;
}

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    date: "",
    venue: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isStaffLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/staff-login");
    } else {
      fetchEvents();
    }
  }, [navigate]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/events");
      setEvents(response.data);
      setError(null);
    } catch (err) {
      console.error("❌ Failed to fetch events:", err);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/events", newEvent);
      console.log("✅ Event added:", response.data);
      setNewEvent({ title: "", date: "", venue: "", description: "" });
      setError(null);
      fetchEvents();
    } catch (error) {
      console.error("❌ Failed to add event:", error);
      setError("Failed to add event. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isStaffLoggedIn");
    navigate("/staff-login");
  };

  const handleBackToEvents = () => {
    navigate("/");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Staff Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleBackToEvents}
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

      <form onSubmit={handleAddEvent} className="space-y-4 mb-8 max-w-xl">
        <h2 className="text-xl font-semibold mb-2">Add New Event</h2>
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 px-4 py-2 rounded w-full"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Date"
          className="border border-gray-300 px-4 py-2 rounded w-full"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Venue"
          className="border border-gray-300 px-4 py-2 rounded w-full"
          value={newEvent.venue}
          onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border border-gray-300 px-4 py-2 rounded w-full"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Add Event
        </button>
      </form>

      {loading && <p className="text-center text-gray-500 mb-4">Loading events...</p>}

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <h2 className="text-xl font-semibold mb-2">Current Events</h2>
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index} className="border border-gray-300 rounded p-4 bg-white">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p>Date: {event.date}</p>
            {event.venue && <p>Venue: {event.venue}</p>}
            {event.description && <p>Description: {event.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffDashboard;