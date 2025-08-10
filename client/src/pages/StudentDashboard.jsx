// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../api/axios";

// export default function StudentDashboard() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     }

//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get(`/students/${id}`);
//         setStudent(res.data);
//       } catch (error) {
//         console.error("Failed to fetch student:", error);
//         navigate("/login");
//       }
//     };

//     fetchStudent();
//   }, [id, navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   if (!student) return <p className="p-8">Loading...</p>;

//   return (
//     <div className="p-8 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Student Dashboard</h2>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded shadow-md w-96">
//         <p>
//           <strong>Username:</strong> {student.username}
//         </p>
//         <p>
//           <strong>Email:</strong> {student.email}
//         </p>
//         <p>
//           <strong>Role:</strong> {student.role}
//         </p>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { User, GraduationCap, Award, CreditCard, LogOut } from "lucide-react";

export default function StudentDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("Profile");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchStudent = async () => {
      try {
        const res = await axios.get(`/students/${id}`);
        setStudent(res.data);
      } catch (error) {
        console.error("Failed to fetch student:", error);
        navigate("/login");
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!student) return <p className="p-8">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a2b4c] text-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-400">
          <h1 className="text-2xl font-bold">Student Panel</h1>
          <p className="text-sm text-indigo-200">{student.username}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("Profile")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition ${
              activeTab === "Profile"
                ? "bg-white text-[#1a2b4c] shadow"
                : "hover:bg-[#6983b6]"
            }`}
          >
            <User size={20} /> Profile
          </button>
          <button
            onClick={() => setActiveTab("Batch")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition ${
              activeTab === "Batch"
                ? "bg-white text-[#1a2b4c] shadow"
                : "hover:bg-[#6983b6]"
            }`}
          >
            <GraduationCap size={20} /> Batch
          </button>
          <button
            onClick={() => setActiveTab("Certificate")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition ${
              activeTab === "Certificate"
                ? "bg-white text-[#1a2b4c] shadow"
                : "hover:bg-[#6983b6]"
            }`}
          >
            <Award size={20} /> Certificate
          </button>
          <button
            onClick={() => setActiveTab("Payment")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition ${
              activeTab === "Payment"
                ? "bg-white text-[#1a2b4c] shadow"
                : "hover:bg-[#6983b6]"
            }`}
          >
            <CreditCard size={20} /> Payment
          </button>
        </nav>
        <div className="p-4 border-t border-gray-400">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">{activeTab}</h2>

        {activeTab === "Profile" && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
            <p>
              <strong>Username:</strong> {student.username}
            </p>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
            <p>
              <strong>Role:</strong> {student.role}
            </p>
          </div>
        )}

        {activeTab === "Batch" && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
            <p>Your batch details will be displayed here.</p>
          </div>
        )}

        {activeTab === "Certificate" && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
            <p>Your certificate information will be displayed here.</p>
          </div>
        )}

        {activeTab === "Payment" && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
            <p>Your payment details will be displayed here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
