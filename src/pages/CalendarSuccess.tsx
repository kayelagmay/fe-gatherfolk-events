import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const CalendarSuccess = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);

  const eventDetails = {
    summary: "Gatherfolk Community Event",
    description: "Join us for a community meetup 🎉",
    location: "London, UK",
    start: {
      dateTime: "2025-06-05T18:00:00+01:00",
      timeZone: "Europe/London",
    },
    end: {
      dateTime: "2025-06-05T20:00:00+01:00",
      timeZone: "Europe/London",
    },
  };

  useEffect(() => {
    console.log("window.location.search:", window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    console.log("Access token from URL:", token);
    setAccessToken(token);
  }, []);

  const handleAddEvent = async () => {
    if (!accessToken) {
      alert("Missing access token!");
      return;
    }

    try {
      setAdding(true);

      const response = await axios.post(`${API_BASE_URL}/api/calendar/create`, {
        accessToken,
        eventDetails,
      });

      console.log("✅ Event created!", response.data);
      setSuccess(true);
    } catch (error: unknown) {
      console.error("❌ Failed to add event:", error);
      alert("Failed to add event to Calendar.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Google Calendar Integration 🚀</h1>

      {/* Log in with Google button */}
      <button
        onClick={() =>
          window.location.href = `${API_BASE_URL}/api/auth/google`
        }
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition mb-4"
      >
        Log in with Google
      </button>

      {success ? (
        <p className="text-green-600 font-semibold">Event added to your Google Calendar! 🎉</p>
      ) : (
        <>
          <p className="mb-4">Click below to add the event to your Calendar:</p>
          <button
            onClick={handleAddEvent}
            disabled={adding}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            {adding ? "Adding Event..." : "Add Event to Calendar"}
          </button>
        </>
      )}
    </div>
  );
};

export default CalendarSuccess;