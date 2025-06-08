import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";

interface Event {
  title: string;
  date: { start_date: string; end_date?: string } | string;
  venue?: { name: string };
  description?: string;
  link?: string;
}

const formatDate = (startDate: string): string => {
  const thisYear = new Date().getFullYear();
  const fullDateString = `${startDate} ${thisYear}`;
  const date = new Date(fullDateString);

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const EventCard = ({ event }: { event: Event }) => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Check if already signed up (from localStorage)
  useEffect(() => {
    const signedUpEvents = JSON.parse(localStorage.getItem("signedUpEvents") || "[]");
    if (signedUpEvents.includes(event.title)) {
      setIsSignedUp(true);
    }
  }, [event.title]);

  // Handle Sign Up click
  const handleSignUp = () => {
    const signedUpEvents = JSON.parse(localStorage.getItem("signedUpEvents") || "[]");
    if (!signedUpEvents.includes(event.title)) {
      signedUpEvents.push(event.title);
      localStorage.setItem("signedUpEvents", JSON.stringify(signedUpEvents));
      setIsSignedUp(true);
    }
  };

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-lg p-6 flex flex-col justify-between border border-gray-300">
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-1">
        {typeof event.date === "string"
          ? event.date
          : formatDate(event.date.start_date)}
      </p>
      {event.venue?.name && (
        <p className="text-gray-700 mb-2">Venue: {event.venue.name}</p>
      )}
      {event.description && (
        <p className="text-gray-500 text-sm mb-4">
          {event.description.length > 150
            ? `${event.description.slice(0, 150)}...`
            : event.description}
        </p>
      )}
      <div className="flex flex-col space-y-2 mt-auto">
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
          >
            More Info
          </a>
        )}

        {!isSignedUp ? (
          <button
            onClick={handleSignUp}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-center"
          >
            Sign Up
          </button>
        ) : (
          <>
            <div className="inline-block bg-gray-300 text-gray-700 px-4 py-2 rounded text-center">
              Signed Up! 🎉
            </div>
            <button
              onClick={() =>
                window.location.href = `${API_BASE_URL}/api/auth/google`
              }
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
            >
              Add to Google Calendar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;