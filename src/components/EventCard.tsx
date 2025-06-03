import React from "react";

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
      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
        >
          More Info
        </a>
      )}
    </div>
  );
};

export default EventCard;
