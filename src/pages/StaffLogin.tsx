import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple hardcoded credentials for MVP
    if (username === "staff" && password === "password123") {
      localStorage.setItem("isStaffLoggedIn", "true");
      navigate("/staff-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Staff Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 px-4 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default StaffLogin;