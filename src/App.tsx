import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsList from "./components/EventsList";
import CalendarSuccess from "./pages/CalendarSuccess";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          GatherFolk Events
        </h1>

        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/calendar-success" element={<CalendarSuccess />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
