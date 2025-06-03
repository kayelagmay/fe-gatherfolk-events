import React from 'react';
import EventsList from './components/EventsList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        GatherFolk Events
      </h1>
      <EventsList />
    </div>
  );
}

export default App;