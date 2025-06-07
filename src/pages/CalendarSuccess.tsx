import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CalendarSuccess = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);

// This needs amending to show the API event details
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

      const response = await axios.post("http://localhost:3000/api/calendar/create", {
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

  const handleBackToEvents = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Google Calendar Integration 🚀</h1>

      {success ? (
        <p className="text-green-600 font-semibold mb-4">
          Event added to your Google Calendar! 🎉
        </p>
      ) : (
        <>
          <p className="mb-4 text-gray-700">
            Click below to add the event to your Calendar:
          </p>
          <button
            onClick={handleAddEvent}
            disabled={adding}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition mb-4"
          >
            {adding ? "Adding Event..." : "Add Event to Calendar"}
          </button>
        </>
      )}

      <button
        onClick={handleBackToEvents}
        className="bg-gray-400 text-white px-6 py-3 rounded hover:bg-gray-500 transition"
      >
        Back to Events
      </button>
    </div>
  );
};

export default CalendarSuccess;