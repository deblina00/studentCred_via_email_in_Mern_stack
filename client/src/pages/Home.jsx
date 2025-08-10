import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dashboardImg from "../assets/Dashboard.png";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const studentId = localStorage.getItem("studentId");

    if (token) {
      if (role === "admin") navigate("/admin");
      else if (role === "student" && studentId)
        navigate(`/student/${studentId}`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <motion.img
          src={dashboardImg}
          alt="Dashboard illustration"
          className="mx-auto w-full max-w-md mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-blue-800 mb-4"
        >
          Welcome to Student Dashboard
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-800 text-lg mb-8"
        >
          A clean and secure role-based portal to manage and access student
          data.
        </motion.p>

        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
          >
            Student Login
          </Link>
          <Link
            to="/admin-register"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
          >
            Admin Login
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
