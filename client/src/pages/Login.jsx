import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { identifier, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("studentId", res.data.studentId);

      const { role, id } = res.data.user;
      role === "admin" ? navigate("/admin") : navigate(`/student/${id}`);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 text-center"
      >
        <h2 className="text-2xl font-bold text-[#234b9b] mb-4">Login</h2>

        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="relative mb-4">
          <input
            className="p-3 w-full border border-gray-300 rounded pr-12"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#234b9b] hover:bg-[#1a2b4c] text-white p-2 rounded"
        >
          Login
        </button>

        {/* for forget password */}
        <p className="mt-4 text-sm text-center">
          Forgot your password?{" "}
          <a href="/reset-password" className="text-[#1a2b4c] font-semibold">
            Reset here
          </a>
        </p>
      </form>
    </div>
  );
}
