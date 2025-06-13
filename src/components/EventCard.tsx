import React, { useState } from 'react';
import { Event } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const navigate = useNavigate();
  const { id, title, start_date, description, venue } = event;
  const [downloaded, setDownloaded] = useState(false);

  const signedList = (JSON.parse(
    localStorage.getItem('signedUpEvents') || '[]'
  ) as number[]);
  const isSignedUp = id !== undefined && signedList.includes(id);

  const formattedDate = new Date(start_date).toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCalendarDownload = () => {
    if (id === undefined) return;
    const url = `${import.meta.env.VITE_API_URL}/api/calendar/${id}/download`;
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-${id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
  };

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-lg p-6 flex flex-col justify-between border border-gray-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-1">{formattedDate}</p>
      {venue && <p className="text-gray-700 mb-2">Venue: {venue}</p>}
      {description && (
        <p className="text-gray-500 text-sm mb-4">
          {description.length > 200 ? `${description.slice(0, 200)}…` : description}
        </p>
      )}

      <div className="flex flex-col space-y-2 mt-auto">
        {!isSignedUp ? (
          <button
            onClick={() => navigate(`/signup/${id}`)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        ) : (
          <>
            <button
              disabled
              className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed"
            >
              Signed up!
            </button>
            <button
              onClick={handleCalendarDownload}
              disabled={downloaded}
              className={`px-4 py-2 rounded transition ${
                downloaded
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {downloaded ? 'Downloaded!' : 'Add to Calendar'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;